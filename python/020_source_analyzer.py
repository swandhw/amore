import os
import sys
import json
import re
import xml.etree.ElementTree as ET

# 경로 설정 (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
ASIS_DIR = os.path.join(_PROJECT_ROOT, "ASIS")
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(snake_str):
    """SNAKE_CASE 또는 underscore 구분 문자열을 PascalCase로 변환
    BAD_CODE_REGISTER -> BadCodeRegister
    D_MMASM_BAD_CODE -> DMmasmBadCode
    """
    if not snake_str:
        return ""
    components = snake_str.split('_')
    return ''.join(x.capitalize() for x in components)


def to_camel_case(snake_str):
    """PascalCase를 camelCase로 변환"""
    pascal = to_pascal_case(snake_str)
    return pascal[0].lower() + pascal[1:] if pascal else ''


def to_kebab_case(snake_str):
    """SNAKE_CASE를 kebab-case로 변환 (규칙.pdf 1.9 폴더 구조)
    D_MMASM_BAD_CODE -> d-mmasm-bad-code
    """
    if not snake_str:
        return ""
    return snake_str.lower().replace('_', '-')


def get_all_attributes(element, exclude=None):
    """요소의 모든 속성 추출 (있는 것만, 지정된 것 제외)

    Args:
        element: XML 요소
        exclude: 제외할 속성 이름 리스트 (예: ['id'] - id는 별도 처리)
    """
    if exclude is None:
        exclude = []

    attrs = {}
    for attr, val in element.attrib.items():
        if attr not in exclude and val is not None:
            attrs[attr] = val
    return attrs


def get_position_size(element):
    """요소의 위치/크기 속성 추출 (있는 것만)"""
    attrs = {}
    for attr in ['left', 'top', 'right', 'bottom', 'width', 'height']:
        val = element.get(attr)
        if val is not None:
            attrs[attr] = val
    return attrs


def parse_grid(grid_element):
    """Grid 컴포넌트 파싱 - 모든 속성 추출"""
    grid_info = {
        'id': grid_element.get('id'),
        'binddataset': grid_element.get('binddataset'),
        'columns': [],
        'columnSizes': [],
        'rows': [],       # Rows 정보
        'headCells': [],  # Head 셀 전체 정보
        'bodyCells': []   # Body 셀 전체 정보
    }

    # Grid 요소의 모든 속성 추출 (id, binddataset 제외)
    grid_attrs = get_all_attributes(grid_element, exclude=['id', 'binddataset'])
    grid_info.update(grid_attrs)

    formats = grid_element.find('Formats')
    if formats is None:
        return grid_info

    for fmt in formats.findall('Format'):
        head_cells = []
        body_cells = []

        # Columns - 모든 속성 추출
        columns_elem = fmt.find('Columns')
        if columns_elem is not None:
            for col in columns_elem.findall('Column'):
                col_attrs = get_all_attributes(col)
                size = col.get('size')
                if size:
                    grid_info['columnSizes'].append(int(size))

        # Rows - 모든 속성 추출 (head/body row 정보)
        rows_elem = fmt.find('Rows')
        if rows_elem is not None:
            for row in rows_elem.findall('Row'):
                row_info = get_all_attributes(row)
                # band 정보가 있으면 head/body 구분
                grid_info['rows'].append(row_info)

        # Bands - 모든 셀 속성 추출
        for band in fmt.findall('Band'):
            band_id = band.get('id')
            for cell in band.findall('Cell'):
                # 셀의 모든 속성 추출 (빈 값 제외)
                cell_info = {}
                for attr, val in cell.attrib.items():
                    if val is not None and val != '':
                        cell_info[attr] = val

                if band_id == 'head':
                    head_cells.append(cell_info)
                    grid_info['headCells'].append(cell_info)
                elif band_id == 'body':
                    body_cells.append(cell_info)
                    grid_info['bodyCells'].append(cell_info)

        # columns 정보 병합 (기존 구조 유지 + 추가 속성)
        for i, body_cell in enumerate(body_cells):
            col_idx = body_cell.get('col', str(i))
            if col_idx == '':
                col_idx = '0'

            # head에서 title 찾기 (동일 col을 가진 head cell)
            title = ''
            head_cell_info = {}
            for hc in head_cells:
                if hc.get('col', '0') == col_idx:
                    title = hc.get('text', '')
                    head_cell_info = hc.copy()
                    break

            # bind:COLUMN_ID 에서 binding 추출
            text = body_cell.get('text', '')
            binding = ''
            if text and text.startswith('bind:'):
                binding = text.split('bind:')[1]

            # expr 처리 (rowIndex)
            expr = body_cell.get('expr', '')
            edittype = body_cell.get('edittype', '')

            # 컬럼 size (columnSizes 배열에서 가져옴)
            col_size = None
            col_index = int(col_idx) if col_idx.isdigit() else i
            if col_index < len(grid_info['columnSizes']):
                col_size = grid_info['columnSizes'][col_index]

            if expr and not binding:
                # rowIndex column
                col_info = {
                    'id': 'rowIndex',
                    'binding': f'expr:{expr}',
                    'edittype': 'none'
                }
            else:
                col_info = {
                    'id': title,
                    'binding': binding,
                    'edittype': edittype if edittype else 'normal'
                }

            # head cell의 추가 속성 (rowspan, colspan, displaytype 등)
            if head_cell_info:
                for attr in ['rowspan', 'colspan', 'displaytype', 'style', 'cssclass']:
                    if attr in head_cell_info and head_cell_info[attr]:
                        col_info[f'head_{attr}'] = head_cell_info[attr]

            # body cell의 모든 추가 속성
            for attr, val in body_cell.items():
                if attr not in ['col', 'row', 'text', 'expr'] and val:
                    col_info[attr] = val

            # 컬럼 size 추가
            if col_size is not None:
                col_info['size'] = col_size

            grid_info['columns'].append(col_info)

    return grid_info


def parse_combo(combo_element):
    """Combo 컴포넌트 파싱 - 모든 속성 + innerdataset Rows 추출"""
    combo_info = {
        'id': combo_element.get('id')
    }

    # 모든 속성 추출 (id 제외)
    combo_attrs = get_all_attributes(combo_element, exclude=['id'])
    combo_info.update(combo_attrs)

    # datacolumn -> namecolumn 매핑 (호환성 유지)
    if 'datacolumn' in combo_info and 'namecolumn' not in combo_info:
        combo_info['namecolumn'] = combo_info['datacolumn']

    # innerdataset 내부 Rows 데이터 추출
    inner_ds = combo_element.find('Dataset')
    if inner_ds is not None:
        rows = inner_ds.find('Rows')
        if rows is not None:
            inner_rows = []
            for row in rows.findall('Row'):
                row_data = {}
                for col in row.findall('Col'):
                    col_id = col.get('id', '')
                    col_text = col.text or ''
                    if col_id:
                        row_data[col_id] = col_text
                if row_data:
                    inner_rows.append(row_data)
            if inner_rows:
                combo_info['innerdatasetRows'] = inner_rows

    return combo_info


def parse_static(static_element):
    """Static 컴포넌트 파싱 - 모든 속성 추출"""
    static_info = {
        'id': static_element.get('id')
    }

    # 모든 속성 추출 (id 제외)
    static_attrs = get_all_attributes(static_element, exclude=['id'])
    static_info.update(static_attrs)

    return static_info


def parse_button(button_element):
    """Button 컴포넌트 파싱 - 모든 속성 추출"""
    button_info = {
        'id': button_element.get('id')
    }

    # 모든 속성 추출 (id 제외)
    button_attrs = get_all_attributes(button_element, exclude=['id'])
    button_info.update(button_attrs)

    return button_info


def parse_dataset(ds_element):
    """Dataset 파싱 - 모든 속성 추출"""
    ds_info = {
        'id': ds_element.get('id'),
        'columns': [],
        'rows': []
    }

    # Dataset 요소의 모든 속성 추출 (id 제외)
    ds_attrs = get_all_attributes(ds_element, exclude=['id'])
    ds_info.update(ds_attrs)

    # ColumnInfo - Column의 모든 속성 추출
    col_info = ds_element.find('ColumnInfo')
    if col_info is not None:
        for col in col_info.findall('Column'):
            col_data = get_all_attributes(col)
            # id와 type은 필수 필드로 보장
            if 'id' not in col_data:
                col_data['id'] = ''
            if 'type' not in col_data:
                col_data['type'] = 'STRING'
            ds_info['columns'].append(col_data)

    # Rows
    rows = ds_element.find('Rows')
    if rows is not None:
        for row in rows.findall('Row'):
            row_data = {}
            for col in row.findall('Col'):
                row_data[col.get('id')] = col.text
            ds_info['rows'].append(row_data)

    return ds_info


def _resolve_str_argument_var(normalized_text, var_name, call_pos):
    """변수 참조를 해결하여 gfn 패턴 추출

    submitData 등의 변수에서 gfn_GetTranInfo, gfn_GetFilterParam,
    gfn_GetDatasetToPram 패턴을 추출하여 간소화된 표현 반환.

    예: "CODE_TYPE=020"+this.gfn_GetTranInfo("PLANT|LANG_TYPE")
      → 'this.gfn_GetTranInfo("PLANT|LANG_TYPE")'
    """
    # call_pos 이전에서 마지막 할당문 찾기
    pattern = rf'(?:var\s+)?{re.escape(var_name)}\s*=\s*(.+?);'
    text_before = normalized_text[:call_pos]
    matches = list(re.finditer(pattern, text_before))
    if not matches:
        return ''

    expr = matches[-1].group(1).strip()

    # gfn 함수 패턴 추출
    parts = []

    for m in re.finditer(r'this\.gfn_GetTranInfo\s*\(\s*"([^"]*)"\s*\)', expr):
        parts.append(f'this.gfn_GetTranInfo("{m.group(1)}")')

    for m in re.finditer(r'this\.gfn_GetFilterParam\s*\(\s*(this\.\w+)\s*\)', expr):
        parts.append(f'this.gfn_GetFilterParam({m.group(1)})')

    for m in re.finditer(r'this\.gfn_GetDatasetToPram\s*\(\s*this\s*,\s*(\w+)\s*\)', expr):
        parts.append(f'this.gfn_GetDatasetToPram(this,{m.group(1)})')

    if parts:
        return '+'.join(parts)

    # 알려진 패턴이 없으면 원본 표현식 반환
    return expr


def parse_transactions(script_text):
    """gfn_Transaction 계열 호출 파싱 - v0.3 format

    지원:
    - gfn_Transaction: 개별 트랜잭션 (strArgument 원문 보존)
    - gfn_DsSetTransaction: ds_Service 기반 배치 트랜잭션
    - gfn_Code_Transaction: 공통코드 조회 (codeArr 배열)
    """
    transactions = []

    # 주석 제거
    no_comments = re.sub(r'/\*.*?\*/', '', script_text, flags=re.DOTALL)
    no_comments = re.sub(r'//[^\n]*', '', no_comments)

    # 공백 정규화
    normalized = re.sub(r'\s+', ' ', no_comments)

    # 1) gfn_Transaction 파싱 (strArgument: 문자열 리터럴 또는 변수 참조)
    pattern = (
        r'this\.gfn_Transaction\s*\(\s*this\s*,'
        r'\s*"([^"]*)"\s*,'     # strSvcId
        r'\s*"([^"]*)"\s*,'     # strTransition
        r'\s*"([^"]*)"\s*,'     # strSvcNm
        r'\s*"([^"]*)"\s*,'     # strInDatasets
        r'\s*"([^"]*)"'        # strOutDatasets
        r'(?:\s*,\s*(?:"([^"]*)"|(\w+)))?'  # strArgument (string literal or variable)
    )

    for m in re.finditer(pattern, normalized):
        str_arg_literal = m.group(6) or ''
        str_arg_var = m.group(7) if not str_arg_literal else None

        if str_arg_literal:
            str_argument = str_arg_literal
        elif str_arg_var and str_arg_var not in ('true', 'false', 'null', 'undefined'):
            str_argument = _resolve_str_argument_var(normalized, str_arg_var, m.start())
        else:
            str_argument = ''

        transactions.append({
            'name': 'gfn_Transaction',
            'objForm': 'this',
            'strSvcId': m.group(1),
            'strTransition': m.group(2),
            'strSvcNm': m.group(3),
            'strInDatasets': m.group(4),
            'strOutDatasets': m.group(5),
            'strArgument': str_argument,
            'strCallbackFunc': 'fn_CallBack',
        })

    # 2) gfn_DsSetTransaction 파싱 (괄호 균형 매칭으로 strArgument 추출)
    ds_set_prefix = (
        r'(?:this\.)?gfn_DsSetTransaction\s*\(\s*this\s*,'
        r'\s*(?:"([^"]*)"|(\w+))\s*,'     # group 1,2: strTransition
        r'\s*(?:this\.)?(\w+)'             # group 3: objDsSet
    )

    for m in re.finditer(ds_set_prefix, normalized):
        transition_val = m.group(1) or m.group(2) or ''
        ds_set_name = m.group(3) or ''
        arg_val = ''

        # m.end() 이후: 쉼표+strArgument 또는 바로 닫는 괄호
        rest = normalized[m.end():].lstrip()
        if rest.startswith(','):
            after_comma = rest[1:].lstrip()
            # 괄호 깊이 추적: gfn_DsSetTransaction( 의 depth=1
            depth = 1
            end_idx = -1
            for i, ch in enumerate(after_comma):
                if ch == '(':
                    depth += 1
                elif ch == ')':
                    depth -= 1
                    if depth == 0:
                        end_idx = i
                        break
            if end_idx >= 0:
                arg_val = after_comma[:end_idx].strip()

        # 단순 문자열 리터럴이면 따옴표 제거
        if arg_val.startswith('"') and arg_val.endswith('"'):
            arg_val = arg_val[1:-1]
        elif arg_val.startswith("'") and arg_val.endswith("'"):
            arg_val = arg_val[1:-1]

        transactions.append({
            'name': 'gfn_DsSetTransaction',
            'objForm': 'this',
            'strTransition': transition_val,
            'objDsSet': ds_set_name,
            'strArgument': arg_val,
        })

    # 3) gfn_Code_Transaction 파싱 (strArgument 포함)
    code_tx_prefix = r'this\.gfn_Code_Transaction\s*\(\s*this\s*,\s*(\w+)'

    for m in re.finditer(code_tx_prefix, normalized):
        var_name = m.group(1)
        code_entries = _parse_code_arr(no_comments, var_name)

        # 후속 인자에서 strArgument 추출 (괄호 균형 매칭)
        code_str_arg = ''
        rest = normalized[m.end():].lstrip()
        # codeArr 뒤: , "X", this.gfn_GetTranInfo(...))  등
        # 괄호 깊이 추적으로 마지막 닫는 괄호까지의 모든 인자 수집
        if rest.startswith(','):
            depth = 1  # gfn_Code_Transaction( 의 depth
            trailing = rest[1:]  # 첫 번째 쉼표 이후
            end_idx = -1
            for i, ch in enumerate(trailing):
                if ch == '(':
                    depth += 1
                elif ch == ')':
                    depth -= 1
                    if depth == 0:
                        end_idx = i
                        break
            if end_idx >= 0:
                remaining_args = trailing[:end_idx].strip()
                # 마지막 쉼표 뒤 인자가 strArgument
                # "X", this.gfn_GetTranInfo(...) → 마지막이 strArgument
                parts = []
                arg_depth = 0
                start = 0
                for i, ch in enumerate(remaining_args):
                    if ch == '(':
                        arg_depth += 1
                    elif ch == ')':
                        arg_depth -= 1
                    elif ch == ',' and arg_depth == 0:
                        parts.append(remaining_args[start:i].strip())
                        start = i + 1
                parts.append(remaining_args[start:].strip())
                # 마지막 파트가 strArgument (보통 3번째 이후)
                if len(parts) >= 2:
                    code_str_arg = parts[-1].strip().strip('"').strip("'")
                    # gfn 함수 호출이면 원본 유지
                    if 'gfn_' in parts[-1]:
                        code_str_arg = parts[-1].strip()

        transactions.append({
            'name': 'gfn_Code_Transaction',
            'objForm': 'this',
            'codeArrVar': var_name,
            'codeArr': code_entries,
            'strArgument': code_str_arg,
        })

    return transactions


def _parse_code_arr(script_text, var_name):
    """codeArr 변수에서 배열 항목 파싱

    형식: [서비스명, CODE_TYPE, sTransition, 받을Dataset명, 조회된Dataset명]
    """
    entries = []

    # 배열 변수 선언 찾기
    pattern = rf'(?:var|let|const)\s+{re.escape(var_name)}\s*=\s*\[(.*?)\]\s*;'
    match = re.search(pattern, script_text, re.DOTALL)

    if not match:
        return entries

    arr_content = match.group(1)

    # 각 배열 항목 파싱
    item_pattern = r'\[\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*,\s*"([^"]*)"\s*\]'

    for item_match in re.finditer(item_pattern, arr_content):
        entries.append({
            'serviceName': item_match.group(1),
            'codeType': item_match.group(2),
            'transition': item_match.group(3),
            'targetDataset': item_match.group(4),
            'sourceDataset': item_match.group(5),
        })

    return entries


def link_static_to_combo(statics, combos):
    """Static과 Combo를 위치 기반으로 연결하여 라벨 설정

    Static이 Combo의 왼쪽에 있고 top이 유사하면 해당 Static은 Combo의 라벨
    """
    for combo in combos:
        combo_left = int(combo.get('left', 0))
        combo_top = int(combo.get('top', 0))

        best_label = None
        best_distance = float('inf')

        for static in statics:
            static_left = int(static.get('left', 0))
            static_top = int(static.get('top', 0))

            # Static이 Combo 왼쪽에 있어야 함
            if static_left >= combo_left:
                continue

            # top 차이가 10픽셀 이내
            top_diff = abs(static_top - combo_top)
            if top_diff > 10:
                continue

            # 가장 가까운 Static 선택
            distance = combo_left - static_left
            if distance < best_distance:
                best_distance = distance
                best_label = static.get('text', '')

        if best_label:
            combo['label'] = best_label


def deduplicate_by_id(items):
    """ID 기준으로 중복 제거 (첫 번째 항목 유지)"""
    seen = set()
    result = []
    for item in items:
        item_id = item.get('id')
        if item_id and item_id not in seen:
            seen.add(item_id)
            result.append(item)
    return result


def resolve_div_url(div_url, parent_xfdl_path):
    """Div의 url 속성을 실제 파일 경로로 변환

    URL 형식: MODULE::SCREEN_NAME.xfdl
    예: Q07_SEARCH::QSEAR_30_PRD_TRACE_DTL.xfdl

    parent_xfdl_path 예:
    D:/projects/.../APGQMS/workspace/APGQMS/Q07_SEARCH/QSEAR_30_PRD_TRACE/UI/ASIS/QSEAR_30_PRD_TRACE.xfdl
    """
    if not div_url or '::' not in div_url:
        return None

    try:
        # URL 파싱
        module, xfdl_file = div_url.split('::', 1)
        screen_name = xfdl_file.replace('.xfdl', '')

        # parent_xfdl_path에서 workspace까지의 경로 추출
        # .../APGQMS/workspace/APGQMS/Q07_SEARCH/QSEAR_30_PRD_TRACE/UI/ASIS/xxx.xfdl
        parent_path = parent_xfdl_path.replace('\\', '/')
        parts = parent_path.split('/')

        # workspace 위치 찾기
        if 'workspace' in parts:
            workspace_idx = parts.index('workspace')
            # workspace까지의 경로 + system 이름
            base_path = '/'.join(parts[:workspace_idx + 2])  # .../APGQMS/workspace/APGQMS

            # 자식 XFDL 경로 구성
            child_path = f"{base_path}/{module}/{screen_name}/UI/ASIS/{xfdl_file}"

            if os.path.exists(child_path):
                return child_path

            # 대안: 같은 UI/ASIS 폴더 내에 있을 수도 있음
            parent_dir = os.path.dirname(parent_xfdl_path)
            alt_path = os.path.join(parent_dir, xfdl_file)
            if os.path.exists(alt_path):
                return alt_path

    except Exception as e:
        print(f"Warning: Failed to resolve Div URL '{div_url}': {e}")

    return None


def link_splitter_to_divs(splitters, divs):
    """스플리터와 Div를 위치 기반으로 연결

    vertical 스플리터: 왼쪽/오른쪽 Div 찾기
    horizontal 스플리터: 위쪽/아래쪽 Div 찾기
    """
    for splitter in splitters:
        splitter_left = int(splitter.get('left', 0))
        splitter_top = int(splitter.get('top', 0))
        splitter_width = int(splitter.get('width', 5)) if splitter.get('width') else 5
        orientation = splitter.get('orientation', 'vertical')

        left_divs = []
        right_divs = []
        top_divs = []
        bottom_divs = []

        for div in divs:
            div_left = int(div.get('left', 0)) if div.get('left') else 0
            div_top = int(div.get('top', 0)) if div.get('top') else 0
            div_width = int(div.get('width', 0)) if div.get('width') else 0
            div_height = int(div.get('height', 0)) if div.get('height') else 0
            div_right = div_left + div_width
            div_bottom = div_top + div_height

            if orientation == 'vertical':
                # top이 비슷한 범위에 있고 (±50px)
                top_diff = abs(div_top - splitter_top)
                if top_diff <= 50:
                    # 스플리터 기준 왼쪽/오른쪽 구분 (명확하게 분리)
                    # 왼쪽: Div의 right가 스플리터 left보다 작음
                    if div_right < splitter_left:
                        dist = splitter_left - div_right  # 스플리터와의 거리
                        left_divs.append((dist, div))
                    # 오른쪽: Div의 left가 스플리터 right보다 큼
                    elif div_left > splitter_left + splitter_width:
                        dist = div_left - (splitter_left + splitter_width)
                        right_divs.append((dist, div))
            else:  # horizontal
                left_diff = abs(div_left - splitter_left)
                if left_diff <= 50:
                    splitter_height = int(splitter.get('height', 5)) if splitter.get('height') else 5
                    if div_bottom < splitter_top:
                        dist = splitter_top - div_bottom
                        top_divs.append((dist, div))
                    elif div_top > splitter_top + splitter_height:
                        dist = div_top - (splitter_top + splitter_height)
                        bottom_divs.append((dist, div))

        # 가장 가까운 Div 선택 (거리가 작은 것)
        if orientation == 'vertical':
            if left_divs:
                left_divs.sort(key=lambda x: x[0])  # 거리가 가장 가까운 것
                splitter['leftPanel'] = left_divs[0][1].get('id')
            if right_divs:
                right_divs.sort(key=lambda x: x[0])
                splitter['rightPanel'] = right_divs[0][1].get('id')
        else:
            if top_divs:
                top_divs.sort(key=lambda x: x[0])
                splitter['topPanel'] = top_divs[0][1].get('id')
            if bottom_divs:
                bottom_divs.sort(key=lambda x: x[0])
                splitter['bottomPanel'] = bottom_divs[0][1].get('id')


def merge_meta(parent_meta, child_meta):
    """자식 메타데이터를 부모에 병합"""
    for key in ['Datasets', 'Grids', 'Buttons', 'Combos', 'Statics', 'Scripts', 'Splitters', 'Divs', 'Tabs']:
        if key in child_meta and child_meta[key]:
            parent_meta[key].extend(child_meta[key])


def parse_xfdl(file_path, parsed_files=None):
    """XFDL 파일 파싱 - v0.2 format (Div URL 참조 지원)"""
    # 순환 참조 방지
    if parsed_files is None:
        parsed_files = set()

    file_path_normalized = os.path.normpath(file_path)
    if file_path_normalized in parsed_files:
        print(f"Skipping already parsed: {file_path}")
        return {'Form': {}, 'Datasets': [], 'Grids': [], 'Buttons': [], 'Combos': [], 'Statics': [], 'Scripts': [], 'Splitters': [], 'Divs': [], 'Tabs': []}

    parsed_files.add(file_path_normalized)
    print(f"Parsing XFDL: {file_path}")

    meta = {
        'Form': {},
        'Datasets': [],
        'Grids': [],
        'Buttons': [],
        'Combos': [],
        'Statics': [],
        'Scripts': [],
        'Splitters': [],  # 스플리터 구조
        'Divs': [],       # Div 컴포넌트 (스플리터 연결용)
        'Tabs': []        # Tab 컴포넌트
    }

    # Div URL로 참조된 자식 XFDL 파일들
    child_xfdl_urls = []

    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        form = root.find('Form')

        if form is None:
            return meta

        # Form 정보 추출 - 모든 속성
        meta['Form'] = {
            'id': form.get('id', '')
        }
        # Form 요소의 모든 속성 추출 (id 제외)
        form_attrs = get_all_attributes(form, exclude=['id'])
        meta['Form'].update(form_attrs)

        # Layouts (Controls) - 재귀적으로 모든 자식 요소 탐색
        layouts = form.find('Layouts')
        if layouts is not None:
            layout = layouts.find('Layout')
            if layout is not None:
                # 부모 Div/Tab 오프셋을 자식 컴포넌트 위치에 적용
                def apply_offset(info, offsets):
                    for attr in ['left', 'top', 'right', 'bottom']:
                        if attr in info and offsets.get(attr, 0) != 0:
                            try:
                                info[attr] = str(int(info[attr]) + offsets[attr])
                            except (ValueError, TypeError):
                                pass
                    return info

                # 컨테이너 요소의 위치 오프셋 계산
                def calc_child_offsets(container_elem, parent_offsets):
                    new_offsets = dict(parent_offsets)
                    for attr in ['left', 'top', 'right', 'bottom']:
                        val = container_elem.get(attr)
                        if val is not None:
                            try:
                                new_offsets[attr] = parent_offsets.get(attr, 0) + int(val)
                            except (ValueError, TypeError):
                                pass
                    return new_offsets

                # 재귀적으로 모든 컨트롤 찾기 (Div, Tab, Tabpage 내부 포함)
                def find_controls_recursive(element, offsets=None):
                    if offsets is None:
                        offsets = {}
                    for child in element:
                        tag = child.tag
                        if tag == 'Grid':
                            grid_info = parse_grid(child)
                            apply_offset(grid_info, offsets)
                            meta['Grids'].append(grid_info)
                        elif tag == 'Combo':
                            combo_info = parse_combo(child)
                            apply_offset(combo_info, offsets)
                            meta['Combos'].append(combo_info)
                        elif tag == 'Button':
                            btn_info = parse_button(child)
                            apply_offset(btn_info, offsets)
                            meta['Buttons'].append(btn_info)
                        elif tag == 'Static':
                            static_info = parse_static(child)
                            if static_info:
                                apply_offset(static_info, offsets)
                                meta['Statics'].append(static_info)
                        elif tag == 'Div':
                            # Div 정보 저장 (스플리터 연결용)
                            div_info = {
                                'id': child.get('id', ''),
                                'left': child.get('left', ''),
                                'top': child.get('top', ''),
                                'right': child.get('right', ''),
                                'bottom': child.get('bottom', ''),
                                'width': child.get('width', ''),
                                'height': child.get('height', ''),
                            }
                            apply_offset(div_info, offsets)
                            meta['Divs'].append(div_info)

                            # Div에 url 속성이 있으면 자식 XFDL 참조
                            div_url = child.get('url', '')
                            if div_url and '::' in div_url:
                                child_xfdl_urls.append(div_url)
                            else:
                                # url이 없으면 내부 Layouts 탐색 (Div 오프셋 누적)
                                div_offsets = calc_child_offsets(child, offsets)
                                div_layouts = child.find('Layouts')
                                if div_layouts is not None:
                                    for div_layout in div_layouts.findall('Layout'):
                                        find_controls_recursive(div_layout, div_offsets)
                        elif tag == 'ImageViewer':
                            # 스플리터 바 감지 (ondrag 이벤트 + Splitter 관련 cssclass)
                            ondrag = child.get('ondrag', '')
                            cssclass = child.get('cssclass', '')
                            if ondrag or 'Splitter' in cssclass or 'splitter' in cssclass.lower():
                                splitter_info = {
                                    'id': child.get('id', ''),
                                    'left': child.get('left', ''),
                                    'top': child.get('top', ''),
                                    'width': child.get('width', ''),
                                    'height': child.get('height', ''),
                                    'orientation': 'vertical' if 'V' in cssclass or int(child.get('width', '10')) < int(child.get('height', '10')) else 'horizontal',
                                    'ondrag': ondrag,
                                }
                                apply_offset(splitter_info, offsets)
                                meta['Splitters'].append(splitter_info)
                        elif tag == 'Tab':
                            # Tab 정보 수집
                            tab_info = {
                                'id': child.get('id', ''),
                                'left': child.get('left', ''),
                                'top': child.get('top', ''),
                                'right': child.get('right', ''),
                                'bottom': child.get('bottom', ''),
                                'width': child.get('width', ''),
                                'height': child.get('height', ''),
                                'tabpages': []
                            }
                            apply_offset(tab_info, offsets)

                            # Tab > Tabpages > Tabpage 탐색
                            tab_offsets = calc_child_offsets(child, offsets)
                            tabpages = child.find('Tabpages')
                            if tabpages is not None:
                                for tabpage in tabpages.findall('Tabpage'):
                                    tp_info = {
                                        'id': tabpage.get('id', ''),
                                        'text': tabpage.get('text', ''),
                                        'url': tabpage.get('url', ''),
                                    }
                                    tab_info['tabpages'].append(tp_info)

                                    # url이 있으면 자식 XFDL 참조로 추가
                                    tp_url = tabpage.get('url', '')
                                    if tp_url and '::' in tp_url:
                                        child_xfdl_urls.append(tp_url)

                                    # 내부 Layouts 탐색
                                    tp_layouts = tabpage.find('Layouts')
                                    if tp_layouts is not None:
                                        for tp_layout in tp_layouts.findall('Layout'):
                                            find_controls_recursive(tp_layout, tab_offsets)

                            meta['Tabs'].append(tab_info)
                        elif tag == 'Layouts':
                            # 중첩된 Layouts 처리
                            for nested_layout in child.findall('Layout'):
                                find_controls_recursive(nested_layout, offsets)

                find_controls_recursive(layout)

        # Objects (Datasets)
        objects = form.find('Objects')
        if objects is not None:
            for ds in objects.findall('Dataset'):
                ds_info = parse_dataset(ds)
                meta['Datasets'].append(ds_info)

        # Script
        script = form.find('Script')
        if script is not None and script.text:
            meta['Scripts'] = parse_transactions(script.text)

            # gfn_DsSetTransaction → ds_Service rows 해석
            ds_set_txns = [s for s in meta['Scripts'] if s.get('name') == 'gfn_DsSetTransaction']
            if ds_set_txns:
                ds_service = next((ds for ds in meta['Datasets'] if ds['id'] == 'ds_Service'), None)
                if ds_service and ds_service.get('rows'):
                    str_argument = ds_set_txns[0].get('strArgument', '')
                    for row in ds_service['rows']:
                        transition = row.get('Transition', '')
                        if not transition:
                            continue
                        meta['Scripts'].append({
                            'name': 'gfn_DsSetTransaction',
                            'strSvcId': row.get('SvcId', transition),
                            'strTransition': transition,
                            'strSvcNm': row.get('SvcNm', ''),
                            'strInDatasets': row.get('InDatasets') or '',
                            'strOutDatasets': row.get('OutDatasets') or '',
                            'strCallbackFunc': row.get('CallbackFunc', 'fn_CallBack'),
                            'strArgument': str_argument,
                        })
                    # ds_Service 자체는 생성 대상이 아니므로 Datasets에서 제거
                    meta['Datasets'] = [ds for ds in meta['Datasets'] if ds['id'] != 'ds_Service']

            # 추가 메타데이터 추출 (원본 xfdl script 기반)
            script_text = script.text

            # hasAuthCheck: gfn_CommL3AuthChk 호출 존재 여부
            meta['hasAuthCheck'] = 'gfn_CommL3AuthChk' in script_text

            # hasCloseGuard: value_change_flag 사용 여부
            meta['hasCloseGuard'] = 'value_change_flag' in script_text

            # saveDsName: save 트랜잭션의 strInDatasets에서 데이터셋명 파싱
            meta['saveDsName'] = ''
            for txn in meta['Scripts']:
                if txn.get('strSvcId') == 'save':
                    in_datasets = txn.get('strInDatasets', '')
                    if '=' in in_datasets:
                        # "ds_datagrid1=ds_datagrid1:A" → "ds_datagrid1"
                        meta['saveDsName'] = in_datasets.split('=')[0].strip()
                    elif in_datasets:
                        meta['saveDsName'] = in_datasets.strip()
                    break

        # Div URL로 참조된 자식 XFDL 파일들 파싱 및 병합
        for div_url in child_xfdl_urls:
            child_path = resolve_div_url(div_url, file_path)
            if child_path:
                print(f"  → Following Div URL: {div_url}")
                child_meta = parse_xfdl(child_path, parsed_files)
                merge_meta(meta, child_meta)
            else:
                print(f"  → Warning: Could not resolve Div URL: {div_url}")

        # ID 기준 중복 제거 (Tab 내 중복 컨트롤 처리)
        meta['Grids'] = deduplicate_by_id(meta['Grids'])
        meta['Buttons'] = deduplicate_by_id(meta['Buttons'])
        meta['Combos'] = deduplicate_by_id(meta['Combos'])
        meta['Statics'] = deduplicate_by_id(meta['Statics'])

        # Static-Combo 라벨 연결
        link_static_to_combo(meta['Statics'], meta['Combos'])

        # Splitter-Div 연결
        link_splitter_to_divs(meta['Splitters'], meta['Divs'])

    except Exception as e:
        print(f"Error parsing XFDL: {e}")
        import traceback
        traceback.print_exc()

    return meta


def main(folder_name=None, source_path=None):
    """메인 함수 - 폴더 기반 입력

    Args:
        folder_name: 화면명 (SNAKE_CASE, 예: BAD_CODE_REGISTER)
        source_path: ASIS 소스 경로 (옵션, 없으면 ASIS_DIR/{folder_name} 사용)
    """

    if folder_name is None:
        print("Usage: python 020_source_analyzer.py <folder_name> [source_path]")
        print("Example: python 020_source_analyzer.py BAD_CODE_REGISTER")
        print("Example: python 020_source_analyzer.py D_MMASM_BAD_CODE /path/to/UI/ASIS")
        return

    # 입력 폴더 경로 결정
    if source_path and os.path.exists(source_path):
        input_folder = source_path
    else:
        input_folder = os.path.join(ASIS_DIR, folder_name)

    if not os.path.exists(input_folder):
        print(f"Folder not found: {input_folder}")
        return

    # XFDL 파일 찾기
    xfdl_file = os.path.join(input_folder, f"{folder_name}.xfdl")

    if not os.path.exists(xfdl_file):
        # 폴더 내 xfdl 파일 검색
        for f in os.listdir(input_folder):
            if f.endswith('.xfdl'):
                xfdl_file = os.path.join(input_folder, f)
                break

    if not os.path.exists(xfdl_file):
        print(f"XFDL file not found in: {input_folder}")
        return

    # XFDL 파싱
    meta = parse_xfdl(xfdl_file)

    # 화면명 설정
    # 폴더명: camelCase
    # 컴포넌트명: PascalCase (BadCodeRegister)
    folder_name_camel = to_camel_case(folder_name)
    screen_name = to_pascal_case(folder_name)

    # 출력 디렉토리 설정 (camelCase 폴더명)
    output_dir = os.path.join(TOBE_BASE_DIR, folder_name_camel)

    # 출력 디렉토리 생성
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # {화면명}.META.json 저장
    output_file = os.path.join(output_dir, f"{screen_name}.META.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(meta, f, indent=4, ensure_ascii=False)

    print(f"META.json saved to: {output_file}")
    return output_dir


if __name__ == "__main__":
    folder_name = sys.argv[1] if len(sys.argv) > 1 else None
    source_path = sys.argv[2] if len(sys.argv) > 2 else None
    main(folder_name, source_path)
