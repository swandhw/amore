import os
import sys
import json
import re

# Configuration (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(snake_str):
    """SNAKE_CASE를 PascalCase로 변환
    BAD_CODE_REGISTER -> BadCodeRegister
    """
    if not snake_str:
        return ""
    components = snake_str.split('_')
    return ''.join(x.capitalize() for x in components)


def to_camel_case(text):
    """SNAKE_CASE를 camelCase로 변환
    CODE_KOR_NAME -> codeKorName
    PRD_CI -> prdCi
    """
    if not text:
        return ""
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:] if pascal else ''


def to_kebab_case(text):
    """SNAKE_CASE를 kebab-case로 변환 (규칙.pdf 1.9 폴더 구조)"""
    if not text:
        return ""
    return text.lower().replace('_', '-')


def to_type_name(ds_id):
    """Dataset ID를 Type 이름으로 변환 (v0.2.2)
    ds_combo1 -> DsCombo1
    ds_SearchListResult535_Row -> DsSearchListResult535Row
    """
    if not ds_id:
        return ""
    components = ds_id.split('_')
    return ''.join((x[0].upper() + x[1:]) if x else '' for x in components)


def to_var_name(ds_id):
    """Dataset ID를 변수명으로 변환 (ds 접두사 유지, 원본 대소문자 유지)
    ds_SearchListResult535_Row -> dsSearchListResult535Row
    ds_combo1 -> dsCombo1
    """
    tn = to_type_name(ds_id)
    return tn[0].lower() + tn[1:] if tn else ''


def get_type_mapping(nexacro_type):
    """Nexacro 타입을 TypeScript 타입으로 변환"""
    if not nexacro_type:
        return 'string'
    nt = nexacro_type.upper()
    if nt in ['INT', 'FLOAT', 'BIGDECIMAL', 'NUMBER']:
        return 'number'
    return 'string'


def get_main_grid_dataset(meta_data):
    """메인 그리드에 바인딩된 Dataset ID 찾기"""
    grids = meta_data.get('Grids', [])
    if grids:
        return grids[0].get('binddataset', '')
    return None


def get_grid_column_binding_map(meta_data):
    """Grid 컬럼의 binding -> header(id) 매핑 반환"""
    grids = meta_data.get('Grids', [])
    if not grids:
        return {}

    columns = grids[0].get('columns', [])
    mapping = {}
    for col in columns:
        binding = col.get('binding', '')
        header = col.get('id', '')
        if binding and not binding.startswith('expr:'):
            mapping[binding] = header
    return mapping


def resolve_combo_label(combo, statics):
    """콤보 라벨 결정 헬퍼
    1. combo에 label이 있으면 사용
    2. Statics에서 cell_title cssclass를 가진 항목 중 위치가 가까운 것 매칭
    3. fallback: combo id
    """
    # 1) combo 자체 label 확인
    label = combo.get('label', '')
    if label:
        return label

    # 2) Statics cell_title 근접매칭
    combo_left = _parse_position(combo.get('left', '0'))
    combo_top = _parse_position(combo.get('top', '0'))

    cell_titles = [s for s in statics if s.get('cssclass', '') == 'cell_title' and s.get('text', '')]

    if cell_titles:
        # 같은 행(비슷한 top)에서 왼쪽에 있는 cell_title 중 가장 가까운 것
        best = None
        best_dist = float('inf')
        for ct in cell_titles:
            ct_left = _parse_position(ct.get('left', '0'))
            ct_top = _parse_position(ct.get('top', '0'))
            # 같은 줄 (top 차이 10px 이내) 이고 combo 왼쪽에 있는 것
            if abs(ct_top - combo_top) <= 10 and ct_left < combo_left:
                dist = combo_left - ct_left
                if dist < best_dist:
                    best_dist = dist
                    best = ct

        if best:
            return best.get('text', combo.get('id', ''))

    # 3) fallback
    return combo.get('id', '')


def _parse_position(val):
    """위치 문자열을 숫자로 변환"""
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0


def generate_types_file(meta_data, output_dir, screen_name):
    """단일 Types 파일 생성 (v2.1)
    types/{ScreenName}Types.ts
    순서: Row → SearchParams → 보조 타입 (combo 참조 dataset만)
    """
    datasets = meta_data.get('Datasets', [])
    main_ds_id = get_main_grid_dataset(meta_data)
    combos = meta_data.get('Combos', [])
    grids = meta_data.get('Grids', [])
    statics = meta_data.get('Statics', [])

    # combo에서 참조하는 dataset ID 수집 (그리드 combo + 검색 combo)
    referenced_ds_ids = set()
    for grid in grids:
        for col in grid.get('columns', []):
            if col.get('edittype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    referenced_ds_ids.add(combo_ds)
    for combo in combos:
        inner_ds = combo.get('innerdataset', '').lstrip('@')
        if inner_ds:
            referenced_ds_ids.add(inner_ds)

    content = ""

    # 1) Row 타입 (CUD_TYPE 제외)
    has_main_row = False
    for ds_info in datasets:
        if ds_info.get('id') == main_ds_id:
            has_main_row = True
            columns = ds_info.get('columns', [])
            content += f"export type {screen_name}Row = {{\n"
            for col in columns:
                col_id = col.get('id', '')
                if col_id and col_id != 'CUD_TYPE':
                    ts_type = get_type_mapping(col.get('type'))
                    camel_name = to_camel_case(col_id)
                    content += f"  {camel_name}: {ts_type};\n"
            content += "};\n\n"
            break

    if not has_main_row:
        content += f"// Placeholder type (no main dataset found)\n"
        content += f"export type {screen_name}Row = Record<string, unknown>;\n\n"

    # 2) SearchParams 타입 (innerdataset이 있는 Combos만)
    search_combos = [c for c in combos if c.get('innerdataset', '').lstrip('@')]
    if search_combos:
        content += f"export type {screen_name}SearchParams = {{\n"
        for combo in search_combos:
            combo_id = combo.get('id', '')
            label = resolve_combo_label(combo, statics)
            camel_id = to_camel_case(combo_id)
            content += f"  {camel_id}?: string | null;  // {label}\n"
        content += "};\n\n"

    # 3) 보조 타입 (combo에서 참조하는 dataset만)
    for ds_info in datasets:
        ds_id = ds_info.get('id', '')
        if ds_id == main_ds_id or ds_id not in referenced_ds_ids:
            continue
        columns = ds_info.get('columns', [])
        type_name = to_type_name(ds_id)
        content += f"export type {type_name} = {{\n"
        for col in columns:
            col_id = col.get('id', '')
            if col_id:
                ts_type = get_type_mapping(col.get('type'))
                camel_name = to_camel_case(col_id)
                content += f"  {camel_name}: {ts_type};\n"
        content += "};\n\n"

    types_dir = os.path.join(output_dir, "types")
    os.makedirs(types_dir, exist_ok=True)
    type_file_name = f"{screen_name}Types.ts"
    type_file = os.path.join(types_dir, type_file_name)
    with open(type_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated Type: types/{type_file_name}")


def generate_create_row_hook(meta_data, output_dir, screen_name):
    """useCreate{ScreenName}Row.ts 생성 (v0.2.2)"""
    hooks_dir = os.path.join(output_dir, "hooks")
    os.makedirs(hooks_dir, exist_ok=True)

    main_ds_id = get_main_grid_dataset(meta_data)
    datasets = meta_data.get('Datasets', [])

    # 메인 데이터셋의 컬럼 찾기
    main_columns = []
    for ds_info in datasets:
        if ds_info.get('id') == main_ds_id:
            main_columns = ds_info.get('columns', [])
            break

    content = f"""import type {{ {screen_name}Row }} from '../types/{screen_name}Types';

export const create{screen_name}Row = (): {screen_name}Row => {{
  return {{
"""

    for col in main_columns:
        col_id = col.get('id', '')
        if col_id and col_id != 'CUD_TYPE':
            camel_name = to_camel_case(col_id)
            # CUD_CI나 USE_YN 같은 컬럼은 기본값 'Y'
            if col_id in ['CUD_CI', 'USE_YN', 'USE_STATUS']:
                content += f"    {camel_name}: 'Y',\n"
            else:
                content += f"    {camel_name}: '',\n"

    content += """  };
};
"""

    hook_file = os.path.join(hooks_dir, f"useCreate{screen_name}Row.ts")
    with open(hook_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated Hook: hooks/useCreate{screen_name}Row.ts")


def get_dataset_columns(datasets, ds_id):
    """Dataset ID로 해당 데이터셋의 컬럼 목록 반환"""
    for ds in datasets:
        if ds.get('id') == ds_id:
            return [col.get('id', '') for col in ds.get('columns', [])]
    return []


def validate_combo_datacol(datasets, combo_ds, specified_datacol, codecol):
    """combodatacol이 실제 dataset에 존재하는지 확인하고, 없으면 적절한 컬럼 반환"""
    ds_columns = get_dataset_columns(datasets, combo_ds)

    if not ds_columns:
        return specified_datacol

    if specified_datacol in ds_columns:
        return specified_datacol

    for col in ds_columns:
        if col != codecol:
            return col

    return specified_datacol


def _detect_name_groups(column_with_pos):
    """연속된 컬럼의 헤더 텍스트 공통 접두사로 그룹 감지.

    head row가 2줄 이상이고 head_colspan이 없는 경우에만 호출.
    2개 이상 연속 컬럼이 공통 접두사(2글자 이상)를 공유하면 그룹으로 판정.

    Returns:
        dict: start_index -> (count, group_label)
    """
    groups = {}
    n = len(column_with_pos)
    i = 0

    while i < n:
        header_i = column_with_pos[i][1].get('id', '')

        j = i + 1
        common_prefix = header_i

        while j < n:
            header_j = column_with_pos[j][1].get('id', '')
            # 문자 단위 공통 접두사 계산
            new_prefix = ''
            for a, b in zip(common_prefix, header_j):
                if a == b:
                    new_prefix += a
                else:
                    break

            if len(new_prefix) >= 2:
                common_prefix = new_prefix
                j += 1
            else:
                break

        group_size = j - i
        if group_size >= 2:
            groups[i] = (group_size, common_prefix)
            i = j
        else:
            i += 1

    return groups


def extract_align_from_style(style_str):
    """style="align:center middle;" → 'center'"""
    match = re.search(r'align:\s*(left|center|right)', style_str or '')
    return match.group(1) if match else None


def generate_grid_column_hook(meta_data, output_dir, screen_name):
    """useCreateGridColumn.ts 생성 - v2.0 HeaderTree 포함

    변경점:
    - headerRowSpan, isRowIndex 속성 제거
    - expr: 바인딩 컬럼 전체 제거
    - width → 항상 '*'
    - 모든 컬럼에 dataType: 'String' 추가
    - HeaderTree import 및 상수 추가
    """
    hooks_dir = os.path.join(output_dir, "hooks")
    os.makedirs(hooks_dir, exist_ok=True)

    grids = meta_data.get('Grids', [])
    datasets = meta_data.get('Datasets', [])
    form_id = meta_data.get('Form', {}).get('id', screen_name)

    if not grids:
        return

    # 모든 그리드에서 사용되는 combo dataset 수집
    all_combo_datasets = {}
    for grid in grids:
        columns = grid.get('columns', [])
        for col in columns:
            if col.get('edittype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    type_name = to_type_name(combo_ds)
                    param_name = to_var_name(combo_ds)
                    codecol = col.get('combocodecol', 'COMM_CODE')
                    specified_datacol = col.get('combodatacol', 'CODE_KOR_NAME')

                    actual_datacol = validate_combo_datacol(
                        datasets, combo_ds, specified_datacol, codecol
                    )

                    all_combo_datasets[combo_ds] = {
                        'type': type_name,
                        'param': param_name,
                        'codecol': codecol,
                        'datacol': actual_datacol
                    }

    # Import 생성
    content = 'import type { GridColumnDef } from "@/components/ap-wijmo/grid/GridTypes";\n'
    content += 'import {\n'
    content += '  createGroupNode,\n'
    content += '  createLeafNode,\n'
    content += '  type HeaderNode,\n'
    content += '} from "@/components/ap-wijmo/grid/HeaderTree";\n'

    type_imports = [f"{screen_name}Row"]
    for ds_info in all_combo_datasets.values():
        if ds_info['type'] not in type_imports:
            type_imports.append(ds_info['type'])

    content += f'import type {{ {", ".join(type_imports)} }} from "../types/{screen_name}Types";\n'

    # combo_datasets가 있을 때만 createDataMap import
    if all_combo_datasets:
        content += 'import { createDataMap } from "@/components/ap-wijmo/grid/Util";\n'
    content += '\n'

    # 각 그리드별로 컬럼 정의 함수 생성
    for grid in grids:
        grid_id = grid.get('id', 'datagrid1')
        columns = grid.get('columns', [])

        # expr: 바인딩 컬럼, 빈 binding, CUD_TYPE 필터링 (제거)
        non_expr_columns = [
            col for col in columns
            if col.get('binding', '') and not col.get('binding', '').startswith('expr:')
            and col.get('binding', '') != 'CUD_TYPE'
        ]

        # 이 그리드에서 사용되는 combo dataset 수집
        grid_combo_datasets = {}
        for col in non_expr_columns:
            if col.get('edittype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_') and combo_ds in all_combo_datasets:
                    grid_combo_datasets[combo_ds] = all_combo_datasets[combo_ds]

        func_name = f"create{to_pascal_case(grid_id)}ColumnDefinition"

        # 함수 시그니처 (파라미터 포함)
        if grid_combo_datasets:
            content += f"export const {func_name} = ({{\n"
            for ds_id, ds_info in grid_combo_datasets.items():
                content += f"    {ds_info['param']},\n"
            content += f"}} : {{\n"
            for ds_id, ds_info in grid_combo_datasets.items():
                content += f"    {ds_info['param']}: {ds_info['type']}[],\n"
            content += f"}}): GridColumnDef<{screen_name}Row>[] => {{\n"
        else:
            content += f"export const {func_name} = (): GridColumnDef<{screen_name}Row>[] => {{\n"

        content += "  return [\n"

        # 컬럼 정의 생성 (expr/빈 binding 제외)
        for col in non_expr_columns:
            binding = col.get('binding', '')
            header = col.get('id', '')
            edittype = col.get('edittype', 'normal')
            combo_ds = col.get('combodataset', '')

            # 헤더 텍스트에서 개행문자 제거 및 특수문자 이스케이프
            header_sanitized = header.replace('\n', ' ').replace('\r', '').replace("'", "\\'")

            camel_binding = to_camel_case(binding)

            col_size = col.get('size', None)
            width_value = col_size if col_size and int(col_size) > 0 else "'*'"

            content += "    {\n"
            content += f"      header: '{header_sanitized}',\n"
            content += f"      width: {width_value},\n"
            content += f"      binding: '{camel_binding}',\n"
            content += "      dataType: 'String',\n"

            # align 속성 (원본 xfdl body cell style에서 추출)
            style_str = col.get('style', '')
            align_val = extract_align_from_style(style_str)
            if align_val:
                content += f"      align: '{align_val}',\n"

            # combo 컬럼인 경우 dataMap 추가
            if edittype == 'combo' and combo_ds and not combo_ds.startswith('g_'):
                ds_info = all_combo_datasets.get(combo_ds)
                if ds_info:
                    codecol = to_camel_case(ds_info['codecol'])
                    datacol = to_camel_case(ds_info['datacol'])
                    content += f"      dataMap: createDataMap({ds_info['param']}, '{codecol}', '{datacol}'),\n"

            content += "    },\n"

        content += "  ];\n"
        content += "}\n\n"

    # HeaderTree 상수는 첫 번째(메인) 그리드 기준으로 1번만 생성
    main_grid = grids[0]
    main_columns = main_grid.get('columns', [])
    head_cells = main_grid.get('headCells', [])
    body_cells = main_grid.get('bodyCells', [])

    # row=1 headCells에서 서브헤더 텍스트 맵 구축 (colspan 그룹의 첫 번째 자식용)
    sub_header_map = {}
    for hc in head_cells:
        if hc.get('row') == '1':
            col_str = hc.get('col', '0')
            sub_header_map[col_str] = hc.get('text', '')

    # expr/CUD_TYPE 제외, 원본 col 인덱스 추적
    column_with_pos = []
    for idx, col in enumerate(main_columns):
        binding = col.get('binding', '')
        if binding and not binding.startswith('expr:') and binding != 'CUD_TYPE':
            col_idx = body_cells[idx].get('col', str(idx)) if idx < len(body_cells) else str(idx)
            column_with_pos.append((col_idx, col))

    # 그룹핑 전략 결정: head_colspan 유무 확인
    has_colspan = any(col.get('head_colspan', '') for _, col in column_with_pos)
    head_row_count = sum(1 for r in main_grid.get('rows', []) if r.get('band') == 'head')

    # head_colspan이 없고 head row가 2줄 이상이면 이름 기반 그룹핑 적용
    name_groups = {}
    if not has_colspan and head_row_count >= 2:
        name_groups = _detect_name_groups(column_with_pos)

    header_tree_name = f"{form_id.upper().replace(' ', '_')}_HEADER_TREE"
    content += f"export const {header_tree_name}: HeaderNode[] = [\n"

    i = 0
    while i < len(column_with_pos):
        col_idx_str, col = column_with_pos[i]
        binding = col.get('binding', '')
        header = col.get('id', '')
        camel_binding = to_camel_case(binding)
        head_colspan = col.get('head_colspan', '')

        if head_colspan and int(head_colspan) > 1:
            # colspan 기반 그룹 노드 생성
            group_count = min(int(head_colspan), len(column_with_pos) - i)
            group_label = header.replace('\n', ' ').replace('\r', '').replace('"', '\\"')
            group_id = f"{camel_binding}Group"

            content += f'  createGroupNode("{group_id}", "{group_label}", [\n'

            for j in range(group_count):
                child_col_idx, child_col = column_with_pos[i + j]
                child_binding = child_col.get('binding', '')
                child_header = child_col.get('id', '')
                child_camel = to_camel_case(child_binding)

                # 그룹 첫 번째 자식: id가 부모 텍스트이므로 row=1 서브헤더 사용
                if j == 0 and child_col_idx in sub_header_map:
                    child_header = sub_header_map[child_col_idx]

                child_header_sanitized = child_header.replace('\n', ' ').replace('\r', '').replace('"', '\\"')
                content += f'    createLeafNode("{child_camel}", "{child_header_sanitized}", "{child_camel}"),\n'

            content += '  ]),\n'
            i += group_count

        elif i in name_groups:
            # 이름 기반 그룹 노드 생성 (head row 2줄 + 공통 접두사)
            group_count, group_label = name_groups[i]
            group_label_sanitized = group_label.replace('\n', ' ').replace('\r', '').replace('"', '\\"')

            # 그룹 ID: 헤더 텍스트가 그룹명과 일치하는 컬럼의 binding 사용
            group_binding = binding
            for j in range(group_count):
                _, c = column_with_pos[i + j]
                if c.get('id', '') == group_label:
                    group_binding = c.get('binding', '')
                    break
            group_id = f"{to_camel_case(group_binding)}Group"

            content += f'  createGroupNode("{group_id}", "{group_label_sanitized}", [\n'

            for j in range(group_count):
                _, child_col = column_with_pos[i + j]
                child_binding = child_col.get('binding', '')
                child_header = child_col.get('id', '')
                child_camel = to_camel_case(child_binding)
                child_header_sanitized = child_header.replace('\n', ' ').replace('\r', '').replace('"', '\\"')
                content += f'    createLeafNode("{child_camel}", "{child_header_sanitized}", "{child_camel}"),\n'

            content += '  ]),\n'
            i += group_count

        else:
            header_sanitized = header.replace('\n', ' ').replace('\r', '').replace('"', '\\"')
            content += f'  createLeafNode("{camel_binding}", "{header_sanitized}", "{camel_binding}"),\n'
            i += 1

    content += "];\n"

    hook_file = os.path.join(hooks_dir, "useCreateGridColumn.ts")
    with open(hook_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated Hook: hooks/useCreateGridColumn.ts")


def generate_datasets(screen_name=None):
    """Types와 Hooks 생성 (v2.0)"""

    if screen_name is None:
        dirs = [d for d in os.listdir(TOBE_BASE_DIR) if os.path.isdir(os.path.join(TOBE_BASE_DIR, d))]
        if dirs:
            screen_name = dirs[0]
        else:
            print("Error: No screen folder found")
            return

    # 폴더명: camelCase, 컴포넌트명: PascalCase
    folder_name = to_camel_case(screen_name) if '_' in screen_name else screen_name.lower()
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]

    output_dir = os.path.join(TOBE_BASE_DIR, folder_name)
    meta_file = os.path.join(output_dir, f"{component_name}.META.json")

    if not os.path.exists(meta_file):
        print(f"Error: META file not found at {meta_file}")
        return

    with open(meta_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Processing datasets for {folder_name} (component: {component_name})...")

    # 1. 단일 Types 파일 생성
    generate_types_file(data, output_dir, component_name)

    # 2. useCreate{ScreenName}Row.ts 생성
    generate_create_row_hook(data, output_dir, component_name)

    # 3. useCreateGridColumn.ts 생성
    generate_grid_column_hook(data, output_dir, component_name)


if __name__ == "__main__":
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    generate_datasets(screen_name)
