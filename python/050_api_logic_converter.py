import os
import sys
import json
import re

# Configuration (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(text):
    """문자열을 PascalCase로 변환"""
    if not text:
        return ""
    words = text.split('_')
    return ''.join(word.capitalize() for word in words)


def to_camel_case(text):
    """문자열을 camelCase로 변환"""
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:] if pascal else ''


def to_kebab_case(text):
    """SNAKE_CASE를 kebab-case로 변환"""
    if not text:
        return ""
    return text.lower().replace('_', '-')


def to_type_name(ds_id):
    """Dataset ID를 Type 이름으로 변환
    ds_combo1 -> DsCombo1
    """
    if not ds_id:
        return ""
    components = ds_id.split('_')
    return ''.join((x[0].upper() + x[1:]) if x else '' for x in components)


def to_var_name(ds_id):
    """Dataset ID를 변수명으로 변환"""
    tn = to_type_name(ds_id)
    return tn[0].lower() + tn[1:] if tn else ''


def ds_id_to_row_type_name(ds_id):
    """데이터셋 ID에서 Row 타입명 생성 (멀티 그리드용)"""
    return to_type_name(ds_id) + 'Row'


def ds_id_to_option_type_name(ds_id):
    """보조 데이터셋 ID에서 Option 타입명 생성 (멀티 그리드용)"""
    return to_type_name(ds_id) + 'Option'


def ds_id_to_option_var_name(ds_id):
    """보조 데이터셋 ID에서 Option 변수명 생성 (멀티 그리드용)"""
    return to_var_name(ds_id) + 'Options'


def is_multi_grid(meta_data):
    """멀티 그리드 화면인지 확인"""
    return len(meta_data.get('Grids', [])) > 1


def capitalize_first(s):
    """첫 글자만 대문자로 (camelCase → PascalCase)"""
    return s[0].upper() + s[1:] if s else ''


def extract_dataset_id(ds_mapping):
    """A=B 형태에서 A(Dataset ID) 추출
    ds_datagrid1=dsr_SearchListResult -> ds_datagrid1
    """
    if not ds_mapping:
        return None
    if '=' in ds_mapping:
        return ds_mapping.split('=')[0].strip()
    return ds_mapping.strip()


def get_main_grid_dataset(meta_data):
    """메인 그리드에 바인딩된 Dataset ID 찾기"""
    grids = meta_data.get('Grids', [])
    if grids:
        return grids[0].get('binddataset', '')
    return None


def get_all_grid_dataset_ids(meta_data):
    """모든 그리드에 바인딩된 Dataset ID 목록 반환"""
    grids = meta_data.get('Grids', [])
    return {g.get('binddataset', '') for g in grids if g.get('binddataset', '')}


def get_combo_datasets_for_grid(meta_data):
    """그리드 컬럼에서 사용하는 콤보 데이터셋 목록 반환"""
    grids = meta_data.get('Grids', [])
    if not grids:
        return []
    combo_datasets = []
    for grid in grids:
        columns = grid.get('columns', [])
        for col in columns:
            if col.get('edittype') == 'combo' or col.get('displaytype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    combo_datasets.append(combo_ds)
    return list(set(combo_datasets))


def get_auxiliary_datasets(meta_data, multi=False):
    """보조 Dataset 목록 반환 (그리드 데이터셋 제외, 콤보/그리드에서 참조되는 것들)"""
    grid_ds_ids = get_all_grid_dataset_ids(meta_data)
    datasets = meta_data.get('Datasets', [])
    combos = meta_data.get('Combos', [])

    # 콤보에 연결된 데이터셋
    combo_ds_ids = set()
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            combo_ds_ids.add(inner_ds)

    # 그리드 컬럼에 사용되는 콤보 데이터셋
    grid_combo_ds = get_combo_datasets_for_grid(meta_data)
    combo_ds_ids.update(grid_combo_ds)

    aux_datasets = []
    for ds in datasets:
        ds_id = ds.get('id', '')
        if ds_id not in grid_ds_ids and ds_id in combo_ds_ids:
            if multi:
                type_name = ds_id_to_option_type_name(ds_id)
                var_name = ds_id_to_option_var_name(ds_id)
            else:
                type_name = to_type_name(ds_id)
                var_name = to_var_name(ds_id)
            aux_datasets.append({
                'id': ds_id,
                'type': type_name,
                'var': var_name,
                'columns': ds.get('columns', []),
                'rows': ds.get('rows', [])
            })

    return aux_datasets


def get_api_func_name(direction, component_name, transition, ds_id=None, main_ds_id=None):
    """API 함수명 생성

    direction: 'fetch' or 'post'
    transition이 있으면 By{Transition} 패턴, 없으면 fallback

    예) fetchDMmasmBadCodesByFind, postDMmasmBadCodesByMulti
    """
    if not transition:
        if direction == 'fetch':
            return f"fetch{component_name}s"
        else:
            return f"post{component_name}s"

    transition_pascal = capitalize_first(transition)

    # Target: 메인 그리드 데이터셋이면 ScreenName + 's'
    if not ds_id or ds_id == main_ds_id:
        target = component_name + 's'
    else:
        target = to_type_name(ds_id)

    return f"{direction}{target}By{transition_pascal}"


def get_multi_grid_api_func_name(direction, transition, ds_id):
    """멀티 그리드용 API 함수명 생성 (데이터셋 Row 타입 기반)

    예) fetch + DsProc + Rows + By + FindProc → fetchProcRowsByFindProc
        post + DsProcDtl + Rows + By + SaveProcDtl → postProcDtlRowsBySaveProcDtl
    """
    # ds_id에서 ds_ 제거 후 적절한 이름 생성
    clean_ds = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
    transition_pascal = capitalize_first(to_camel_case(transition)) if transition else ''
    return f"{direction}{clean_ds}RowsBy{transition_pascal}"


def compute_api_func_names(scripts, component_name, main_ds_id, grid_ds_ids=None, multi=False):
    """Scripts 데이터에서 API 함수명 목록 계산 (그리드 바인딩 데이터셋 대상만)

    Returns: (fetch_funcs, save_funcs) - list of dicts with name, transition, strArgument, dsId
    """
    if grid_ds_ids is None:
        grid_ds_ids = {main_ds_id} if main_ds_id else set()

    gfn_txns = [s for s in scripts if s.get('name') in ('gfn_Transaction', 'gfn_DsSetTransaction')]

    fetch_funcs = []
    save_funcs = []

    for txn in gfn_txns:
        transition = txn.get('strTransition', '')
        str_argument = txn.get('strArgument', '')

        out_ds = txn.get('strOutDatasets', '')
        in_ds = txn.get('strInDatasets', '')

        if out_ds:
            out_ds_id = extract_dataset_id(out_ds)
            if out_ds_id in grid_ds_ids:
                if multi:
                    func_name = get_multi_grid_api_func_name('fetch', transition, out_ds_id)
                else:
                    func_name = get_api_func_name('fetch', component_name, transition, out_ds_id, main_ds_id)
                fetch_funcs.append({
                    'name': func_name,
                    'transition': transition,
                    'strArgument': str_argument,
                    'dsId': out_ds_id,
                })

        if in_ds:
            in_ds_id = extract_dataset_id(in_ds)
            if in_ds_id in grid_ds_ids:
                if multi:
                    func_name = get_multi_grid_api_func_name('post', transition, in_ds_id)
                else:
                    func_name = get_api_func_name('post', component_name, transition, in_ds_id, main_ds_id)
                save_funcs.append({
                    'name': func_name,
                    'transition': transition,
                    'strArgument': str_argument,
                    'dsId': in_ds_id,
                })

    # Fallback: no grid-targeting transactions found
    if not fetch_funcs:
        fetch_funcs.append({
            'name': f"fetch{component_name}s",
            'transition': '',
            'strArgument': '',
            'dsId': main_ds_id,
        })
    if not save_funcs:
        save_funcs.append({
            'name': f"post{component_name}s",
            'transition': '',
            'strArgument': '',
            'dsId': main_ds_id,
        })

    # Multi-grid: 트랜잭션으로 커버되지 않은 그리드 데이터셋에 fallback fetch 추가
    if multi and grid_ds_ids:
        covered_fetch_ds = set(ff['dsId'] for ff in fetch_funcs)
        for ds_id in sorted(grid_ds_ids):
            if ds_id not in covered_fetch_ds:
                clean_ds = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
                fetch_funcs.append({
                    'name': f"fetch{clean_ds}Rows",
                    'transition': '',
                    'strArgument': '',
                    'dsId': ds_id,
                })

    return fetch_funcs, save_funcs


def generate_mocks_file(screen_name, meta_data, output_dir, fetch_funcs, save_funcs, multi=False):
    """mocks.ts 생성 - MSW 기반 Mock 핸들러

    - type import + 타입화된 상수 배열
    - 응답 구조: { result, message, responseBody }
    - 읽기 전용: {page}Handlers
    - 변경 전용: {page}MutationHandlers
    """
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]
    kebab_name = to_kebab_case(screen_name) if '_' in screen_name else screen_name.lower()
    form_id_upper = screen_name.upper() if '_' in screen_name else screen_name.upper()

    main_ds_id = get_main_grid_dataset(meta_data)
    datasets = meta_data.get('Datasets', [])
    combos = meta_data.get('Combos', [])

    # 메인 데이터셋 컬럼
    main_columns = []
    main_rows = []
    for ds in datasets:
        if ds.get('id') == main_ds_id:
            main_columns = ds.get('columns', [])
            main_rows = ds.get('rows', [])
            break

    # 보조 데이터셋 (콤보에서 참조)
    aux_datasets = get_auxiliary_datasets(meta_data, multi=multi)

    camel_name = to_camel_case(screen_name) if '_' in screen_name else screen_name
    base_url = f"/api/bff/basic-infos/ai-transform/{kebab_name}"

    grids = meta_data.get('Grids', [])

    # === Type imports ===
    type_names = []
    if multi:
        for grid in grids:
            ds_id = grid.get('binddataset', '')
            if ds_id:
                row_type = ds_id_to_row_type_name(ds_id)
                if row_type not in type_names:
                    type_names.append(row_type)
    else:
        type_names.append(f"{component_name}Row")
    for ds in aux_datasets:
        if ds['type'] not in type_names:
            type_names.append(ds['type'])
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            if multi:
                tn = ds_id_to_option_type_name(inner_ds)
            else:
                tn = to_type_name(inner_ds)
            if tn not in type_names:
                type_names.append(tn)

    sorted_type_names = sorted(type_names)
    content = "import { http, HttpResponse } from 'msw';\n"
    content += f"import type {{\n"
    for tn in sorted_type_names:
        content += f"  {tn},\n"
    content += f"}} from '../types/{component_name}Types';\n\n"

    # === 타입화된 상수 데이터 ===
    if multi:
        for grid in grids:
            ds_id = grid.get('binddataset', '')
            if ds_id:
                row_type = ds_id_to_row_type_name(ds_id)
                ds_clean = ds_id.replace('ds_', '').upper() if ds_id.startswith('ds_') else ds_id.upper()
                content += f"const {form_id_upper}_{ds_clean}_ROWS: {row_type}[] = [];\n"
    else:
        content += f"const {form_id_upper}_ROWS: {component_name}Row[] = [];\n"

    # 보조 데이터셋 상수
    generated_option_endpoints = set()
    all_option_datasets = []  # (ds_id, type_name, ds_columns, ds_rows, const_suffix)

    for ds in aux_datasets:
        ds_id = ds['id']
        if ds_id in generated_option_endpoints:
            continue
        generated_option_endpoints.add(ds_id)
        ds_columns = ds.get('columns', [])
        ds_rows = ds.get('rows', [])
        # 상수 이름: SearchListResult{N}_Row → N, combo{N} → COMBO_N, 기타 → UPPER_SNAKE
        clean_id = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
        slr_match = re.match(r'SearchListResult(\d+)[-_]?Row', clean_id, re.IGNORECASE)
        combo_match = re.match(r'combo(\d+)', clean_id, re.IGNORECASE)
        if slr_match:
            const_suffix = slr_match.group(1)
        elif combo_match:
            const_suffix = f"COMBO_{combo_match.group(1)}"
        else:
            const_suffix = clean_id.upper()
        const_name = f"{form_id_upper}_OPTION_{const_suffix}"
        all_option_datasets.append({
            'ds_id': ds_id, 'type': ds['type'], 'columns': ds_columns,
            'rows': ds_rows, 'const_name': const_name,
        })
        content += f"const {const_name}: {ds['type']}[] = ["
        if ds_rows:
            content += "\n"
            for row in ds_rows[:5]:
                parts = []
                for col in ds_columns:
                    col_id = col.get('id', '')
                    if col_id:
                        camel_col = to_camel_case(col_id)
                        value = row.get(col_id, '')
                        parts.append(f"{camel_col}: '{value}'")
                content += f"  {{ {', '.join(parts)} }},\n"
        content += "];\n"

    # 콤보 데이터셋 상수
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds and inner_ds not in generated_option_endpoints:
            generated_option_endpoints.add(inner_ds)
            ds_info = None
            for d in datasets:
                if d.get('id') == inner_ds:
                    ds_info = d
                    break
            ds_columns = ds_info.get('columns', []) if ds_info else []
            ds_rows = ds_info.get('rows', []) if ds_info else []
            if multi:
                tn = ds_id_to_option_type_name(inner_ds)
            else:
                tn = to_type_name(inner_ds)
            clean_upper = inner_ds.replace('ds_', '').upper() if inner_ds.startswith('ds_') else inner_ds.upper()
            combo_idx = combo.get('id', '').replace('combo', '').replace('_', '')
            if combo_idx.isdigit():
                const_name = f"{form_id_upper}_OPTION_COMBO_{combo_idx}"
            else:
                const_name = f"{form_id_upper}_OPTION_{clean_upper}"
            all_option_datasets.append({
                'ds_id': inner_ds, 'type': tn, 'columns': ds_columns,
                'rows': ds_rows, 'const_name': const_name,
            })
            content += f"const {const_name}: {tn}[] = ["
            if ds_rows:
                content += "\n"
                for row in ds_rows[:5]:
                    parts = []
                    for col in ds_columns:
                        col_id = col.get('id', '')
                        if col_id:
                            camel_col = to_camel_case(col_id)
                            value = row.get(col_id, '')
                            parts.append(f"{camel_col}: '{value}'")
                    content += f"  {{ {', '.join(parts)} }},\n"
            content += "];\n"

    content += "\n"

    # === 메인 GET Mock ===
    get_mock_names = []
    for ff in fetch_funcs:
        mock_name = f"get{capitalize_first(ff['name'].replace('fetch', ''))}Mock"
        get_mock_names.append(mock_name)

        ds_id = ff.get('dsId', '')
        if multi and ds_id:
            ds_clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
            get_url = f"{base_url}/{to_kebab_case(ds_clean)}"
            const_name = f"{form_id_upper}_{ds_clean.upper()}_ROWS"
        else:
            get_url = base_url
            const_name = f"{form_id_upper}_ROWS"

        content += f"export const {mock_name} = http.get('{get_url}', async () => {{\n"
        content += "  return HttpResponse.json({\n"
        content += "    result: 'true',\n"
        content += "    message: 'OK',\n"
        content += f"    responseBody: {const_name},\n"
        content += "  });\n"
        content += "});\n\n"

    # === POST Mock ===
    post_mock_names = []
    for sf in save_funcs:
        mock_name = f"post{capitalize_first(sf['name'].replace('post', ''))}Mock"
        post_mock_names.append(mock_name)

        ds_id = sf.get('dsId', '')
        if multi and ds_id:
            ds_clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
            post_url = f"{base_url}/commands/save-{to_kebab_case(ds_clean)}"
        else:
            post_url = f"{base_url}/commands/save"

        content += f"export const {mock_name} = http.post('{post_url}', async ({{ request }}) => {{\n"
        content += "  const payload = await request.json();\n"
        content += "  return HttpResponse.json({\n"
        content += "    result: 'true',\n"
        content += "    message: 'OK',\n"
        content += "    responseBody: payload,\n"
        content += "  });\n"
        content += "});\n\n"

    # === 보조 데이터셋 GET Mocks ===
    for opt_ds in all_option_datasets:
        ds_id = opt_ds['ds_id']
        option_kebab = to_kebab_case(ds_id.replace('ds_', ''))
        mock_name = f"get{opt_ds['type']}Mock"
        get_mock_names.append(mock_name)

        content += f"export const {mock_name} = http.get('{base_url}/options/{option_kebab}', () => HttpResponse.json({{\n"
        content += "  result: 'true',\n"
        content += "  message: 'OK',\n"
        content += f"  responseBody: {opt_ds['const_name']},\n"
        content += "}));\n\n"

    # === Handlers (읽기 전용) ===
    content += f"export const {camel_name}Handlers = [\n"
    for name in get_mock_names:
        content += f"  {name},\n"
    content += "];\n\n"

    # === MutationHandlers (변경 전용) ===
    content += f"export const {camel_name}MutationHandlers = [{', '.join(post_mock_names)}];\n"

    api_dir = os.path.join(output_dir, "api")
    os.makedirs(api_dir, exist_ok=True)
    mocks_file = os.path.join(api_dir, "mocks.ts")
    with open(mocks_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated API: api/mocks.ts")


def generate_api_file(screen_name=None):
    """화면별 단일 API 파일 생성 (v3.0 - transaction 기반)

    - fetch{Target}By{Transition} / post{Target}By{Transition} 네이밍
    - strArgument 원문 보존
    - apiGet/apiPost 직접 호출
    - gfn_Code_Transaction → 개별 fetch 함수
    """

    if screen_name is None:
        dirs = [d for d in os.listdir(TOBE_BASE_DIR) if os.path.isdir(os.path.join(TOBE_BASE_DIR, d))]
        if dirs:
            screen_name = dirs[0]
        else:
            print("Error: No screen folder found")
            return

    # 폴더명: camelCase, 컴포넌트명: PascalCase
    folder_name = to_camel_case(screen_name) if '_' in screen_name else screen_name.lower()
    camel_name = to_camel_case(screen_name) if '_' in screen_name else screen_name
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]

    output_dir = os.path.join(TOBE_BASE_DIR, folder_name)
    meta_file = os.path.join(output_dir, f"{component_name}.META.json")

    if not os.path.exists(meta_file):
        print(f"Error: META file not found at {meta_file}")
        return

    with open(meta_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    api_dir = os.path.join(output_dir, "api")
    os.makedirs(api_dir, exist_ok=True)

    main_ds_id = get_main_grid_dataset(data)
    grid_ds_ids = get_all_grid_dataset_ids(data)
    datasets = data.get('Datasets', [])
    combos = data.get('Combos', [])
    scripts = data.get('Scripts', [])
    multi = is_multi_grid(data)
    aux_datasets = get_auxiliary_datasets(data, multi=multi)

    # innerdataset이 있는 콤보만 검색 파라미터로 사용
    search_combos = [c for c in combos if c.get('innerdataset', '').lstrip('@')]
    has_search_params = len(search_combos) > 0

    kebab_name = to_kebab_case(screen_name) if '_' in screen_name else screen_name.lower()
    base_api_path = f"/basic-infos/ai-transform/{kebab_name}"

    # Transaction 기반 함수명 계산 (그리드 바인딩 데이터셋 대상만)
    fetch_funcs, save_funcs = compute_api_func_names(scripts, component_name, main_ds_id, grid_ds_ids, multi=multi)

    # gfn_Code_Transaction entries
    code_transactions = [s for s in scripts if s.get('name') == 'gfn_Code_Transaction']

    print(f"Processing API for {folder_name}...")

    # API 파일명
    api_file_name = f"{camel_name}Api.ts"
    api_file = os.path.join(api_dir, api_file_name)

    # === Import Section ===
    content = "import { apiGet, apiPost } from '@/api/httpClient';\n"

    # Type imports
    type_imports = []
    if multi:
        # 멀티 그리드: 각 그리드 데이터셋의 Row 타입
        grids = data.get('Grids', [])
        for grid in grids:
            ds_id = grid.get('binddataset', '')
            if ds_id:
                row_type = ds_id_to_row_type_name(ds_id)
                if row_type not in type_imports:
                    type_imports.append(row_type)
    else:
        type_imports.append(f"{component_name}Row")
    if has_search_params:
        type_imports.append(f"{component_name}SearchParams")
    for ds in aux_datasets:
        if ds['type'] not in type_imports:
            type_imports.append(ds['type'])

    # gfn_Code_Transaction의 targetDataset 타입도 import
    for code_txn in code_transactions:
        for entry in code_txn.get('codeArr', []):
            target_ds = entry.get('targetDataset', '')
            ds_name = f"ds_{target_ds}" if not target_ds.startswith('ds_') else target_ds
            if multi:
                type_name = ds_id_to_option_type_name(ds_name)
            else:
                type_name = to_type_name(ds_name)
            if type_name not in type_imports:
                type_imports.append(type_name)

    content += f"import type {{\n"
    for ti in sorted(type_imports):
        content += f"  {ti},\n"
    content += f"}} from '../types/{component_name}Types';\n"
    content += "\n"

    # === strArgument 상수 수집 ===
    # transition → const 이름 매핑 (의미적 이름 사용)
    _FETCH_TRANSITION_MAP = {'find': 'FIND', 'find00': 'FIND'}
    _SAVE_TRANSITION_MAP = {'multi': 'SAVE', 'save': 'SAVE'}

    str_arg_consts = {}
    for ff in fetch_funcs:
        if ff['strArgument']:
            const_suffix = _FETCH_TRANSITION_MAP.get(ff['transition'], ff['transition'].upper() or 'FIND')
            str_arg_consts[f"STR_ARGUMENT_{const_suffix}"] = ff['strArgument']
    for sf in save_funcs:
        if sf['strArgument']:
            const_suffix = _SAVE_TRANSITION_MAP.get(sf['transition'], sf['transition'].upper() or 'SAVE')
            str_arg_consts[f"STR_ARGUMENT_{const_suffix}"] = sf['strArgument']
    # gfn_Code_Transaction strArgument
    code_str_argument = ''
    for code_txn in code_transactions:
        if code_txn.get('strArgument', ''):
            code_str_argument = code_txn['strArgument']
            str_arg_consts['STR_ARGUMENT_CODE'] = code_str_argument
            break

    # 폴백: gfn_Code_Transaction이 없으면 비그리드 gfn_Transaction에서 추출
    if not code_str_argument:
        all_gfn_txns = [s for s in scripts if s.get('name') == 'gfn_Transaction']
        for txn in all_gfn_txns:
            out_ds = txn.get('strOutDatasets', '')
            out_ds_id = extract_dataset_id(out_ds) if out_ds else ''
            if out_ds_id and out_ds_id not in grid_ds_ids and txn.get('strArgument', ''):
                code_str_argument = txn['strArgument']
                str_arg_consts['STR_ARGUMENT_CODE'] = code_str_argument
                break

    # gfn_DsSetTransaction 비그리드 strArgument 추가
    for txn in [s for s in scripts if s.get('name') == 'gfn_DsSetTransaction']:
        out_ds = txn.get('strOutDatasets', '')
        if not out_ds:
            continue
        out_ds_id = extract_dataset_id(out_ds)
        if out_ds_id and out_ds_id not in grid_ds_ids:
            transition = txn.get('strTransition', '')
            str_argument = txn.get('strArgument', '')
            if str_argument and transition:
                const_suffix = _FETCH_TRANSITION_MAP.get(transition, transition.upper() or 'FIND')
                str_arg_consts[f"STR_ARGUMENT_{const_suffix}"] = str_argument

    if str_arg_consts:
        for const_name, const_value in str_arg_consts.items():
            content += f"const {const_name} = '{const_value}';\n"
        content += "\n"

    # === Transaction-based GET functions ===
    for ff in fetch_funcs:
        func_name = ff['name']
        str_argument = ff['strArgument']
        ds_id = ff['dsId']
        transition_key = f"STR_ARGUMENT_{_FETCH_TRANSITION_MAP.get(ff['transition'], ff['transition'].upper() or 'FIND')}"

        # Return type
        if multi and ds_id:
            return_type = f"{ds_id_to_row_type_name(ds_id)}[]"
        elif not ds_id or ds_id == main_ds_id:
            return_type = f"{component_name}Row[]"
        else:
            return_type = f"{to_type_name(ds_id)}[]" if ds_id else f"{component_name}Row[]"

        # Multi-grid: per-dataset endpoint
        if multi and ds_id:
            ds_clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
            endpoint = f"{base_api_path}/{to_kebab_case(ds_clean)}"
        else:
            endpoint = base_api_path

        if has_search_params:
            content += f"export const {func_name} = async (filter?: Partial<{component_name}SearchParams>) => {{\n"
            content += f"  return apiGet<{return_type}, {component_name}SearchParams>(\n"
            content += f"    '{endpoint}',\n"
            content += f"    filter,\n"
            if str_argument:
                content += f"    {transition_key},\n"
            content += f"  );\n"
        else:
            content += f"export const {func_name} = async () => {{\n"
            if str_argument:
                content += f"  return apiGet<{return_type}>('{endpoint}', undefined, {transition_key});\n"
            else:
                content += f"  return apiGet<{return_type}>('{endpoint}');\n"
        content += "};\n\n"

    # === Transaction-based POST functions ===
    for sf in save_funcs:
        func_name = sf['name']
        str_argument = sf['strArgument']
        ds_id = sf['dsId']
        transition_key = f"STR_ARGUMENT_{_SAVE_TRANSITION_MAP.get(sf['transition'], sf['transition'].upper() or 'SAVE')}"

        # Payload type
        if multi and ds_id:
            payload_type = ds_id_to_row_type_name(ds_id)
        elif not ds_id or ds_id == main_ds_id:
            payload_type = f"{component_name}Row"
        else:
            payload_type = to_type_name(ds_id) if ds_id else f"{component_name}Row"

        # Multi-grid: per-dataset save endpoint
        if multi and ds_id:
            ds_clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
            save_endpoint = f"{base_api_path}/commands/save-{to_kebab_case(ds_clean)}"
        else:
            save_endpoint = f"{base_api_path}/commands/save"

        content += f"export const {func_name} = async (dsName: string, payload: {payload_type}[]) =>\n"
        content += f"  apiPost<{payload_type}>(\n"
        content += f"    '{save_endpoint}',\n"
        content += f"    dsName,\n"
        content += f"    payload,\n"
        if str_argument:
            content += f"    {transition_key},\n"
        content += f"  );\n\n"

    # === gfn_Code_Transaction entries ===
    generated_code_funcs = set()

    for code_txn in code_transactions:
        for entry in code_txn.get('codeArr', []):
            target_ds = entry.get('targetDataset', '')
            if not target_ds:
                continue

            clean_name = target_ds
            ds_name = f"ds_{target_ds}" if not target_ds.startswith('ds_') else target_ds
            if target_ds.startswith('ds_'):
                clean_name = target_ds[3:]
            if multi:
                type_name = ds_id_to_option_type_name(ds_name)
                func_name = f"fetchDs{clean_name}Options"
            else:
                type_name = to_type_name(ds_name)
                func_name = f"fetch{clean_name}"

            if func_name in generated_code_funcs:
                continue
            generated_code_funcs.add(func_name)

            endpoint_kebab = to_kebab_case(clean_name)

            content += f"export const {func_name} = async () => {{\n"
            if code_str_argument:
                content += f"  return apiGet<{type_name}[]>(\n"
                content += f"    '{base_api_path}/options/{endpoint_kebab}',\n"
                content += f"    undefined,\n"
                content += f"    STR_ARGUMENT_CODE,\n"
                content += f"  );\n"
            else:
                content += f"  return apiGet<{type_name}[]>(\n"
                content += f"    '{base_api_path}/options/{endpoint_kebab}',\n"
                content += f"  );\n"
            content += "};\n\n"

    # === 보조 Dataset fetch 함수 생성 (combo datasets) - 중복 없이 ===
    generated_funcs = set()
    for ff in fetch_funcs:
        generated_funcs.add(ff['name'])
    for sf in save_funcs:
        generated_funcs.add(sf['name'])
    generated_funcs.update(generated_code_funcs)

    # ds_id -> generated 여부 추적 (중복 방지)
    generated_ds_ids = set()
    for code_txn in code_transactions:
        for entry in code_txn.get('codeArr', []):
            target_ds = entry.get('targetDataset', '')
            ds_name = f"ds_{target_ds}" if not target_ds.startswith('ds_') else target_ds
            generated_ds_ids.add(ds_name)

    # gfn_DsSetTransaction으로 조회되는 비그리드 데이터셋은 aux에서 제외
    # (DsSetTransaction 핸들러에서 By{Transition} 함수명으로 생성)
    ds_set_out_ids = set()
    for txn in [s for s in scripts if s.get('name') == 'gfn_DsSetTransaction']:
        out_ds = txn.get('strOutDatasets', '')
        if out_ds:
            out_ds_id = extract_dataset_id(out_ds)
            if out_ds_id and out_ds_id not in grid_ds_ids:
                ds_set_out_ids.add(out_ds_id)

    for ds in aux_datasets:
        if ds['id'] in generated_ds_ids or ds['id'] in ds_set_out_ids:
            continue
        generated_ds_ids.add(ds['id'])

        if multi:
            func_name = f"fetchDs{ds['id'].replace('ds_', '')}Options"
        else:
            func_name = f"fetch{ds['type']}"
        if func_name in generated_funcs:
            continue
        generated_funcs.add(func_name)

        ds_clean_id = ds['id'].replace('ds_', '')
        ds_kebab = to_kebab_case(ds_clean_id)
        content += f"export const {func_name} = async () => {{\n"
        if code_str_argument:
            content += f"  return apiGet<{ds['type']}[]>(\n"
            content += f"    '{base_api_path}/options/{ds_kebab}',\n"
            content += f"    undefined,\n"
            content += f"    STR_ARGUMENT_CODE,\n"
            content += f"  );\n"
        else:
            content += f"  return apiGet<{ds['type']}[]>(\n"
            content += f"    '{base_api_path}/options/{ds_kebab}',\n"
            content += f"  );\n"
        content += "};\n\n"

    # === gfn_DsSetTransaction으로 find_proc_code 같은 비그리드 조회 ===
    # (이미 gfn_Code_Transaction으로 커버되지 않는 경우)
    # 콤보 innerdataset 처리보다 먼저 실행해야 함 (By{Transition} 함수명 우선)
    ds_set_txns = [s for s in scripts if s.get('name') == 'gfn_DsSetTransaction']
    for txn in ds_set_txns:
        out_ds = txn.get('strOutDatasets', '')
        if not out_ds:
            continue
        out_ds_id = extract_dataset_id(out_ds)
        if out_ds_id in grid_ds_ids or out_ds_id in generated_ds_ids:
            continue
        generated_ds_ids.add(out_ds_id)
        transition = txn.get('strTransition', '')
        str_argument = txn.get('strArgument', '')

        if multi:
            type_name = ds_id_to_option_type_name(out_ds_id)
            clean = out_ds_id.replace('ds_', '') if out_ds_id.startswith('ds_') else out_ds_id
            func_name = f"fetchDs{clean}OptionsBy{capitalize_first(to_camel_case(transition))}"
        else:
            type_name = to_type_name(out_ds_id)
            func_name = f"fetch{type_name}By{capitalize_first(to_camel_case(transition))}"

        if func_name in generated_funcs:
            continue
        generated_funcs.add(func_name)

        transition_key = f"STR_ARGUMENT_{_FETCH_TRANSITION_MAP.get(transition, transition.upper() or 'FIND')}"

        if has_search_params:
            content += f"export const {func_name} = async (filter?: Partial<{component_name}SearchParams>) => {{\n"
            content += f"  return apiGet<{type_name}[], {component_name}SearchParams>(\n"
            ds_clean = out_ds_id.replace('ds_', '') if out_ds_id.startswith('ds_') else out_ds_id
            content += f"    '{base_api_path}/options/{to_kebab_case(ds_clean)}',\n"
            content += f"    filter,\n"
            if str_argument:
                content += f"    {transition_key},\n"
            content += f"  );\n"
        else:
            ds_clean = out_ds_id.replace('ds_', '') if out_ds_id.startswith('ds_') else out_ds_id
            content += f"export const {func_name} = async () => {{\n"
            content += f"  return apiGet<{type_name}[]>(\n"
            content += f"    '{base_api_path}/options/{to_kebab_case(ds_clean)}',\n"
            content += f"  );\n"
        content += "};\n\n"

    # 조회조건 콤보에 연결된 데이터셋 (aux에 포함 안된 것)
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds and inner_ds not in generated_ds_ids:
            generated_ds_ids.add(inner_ds)
            if multi:
                type_name = ds_id_to_option_type_name(inner_ds)
                func_name = f"fetchDs{inner_ds.replace('ds_', '')}Options"
            else:
                type_name = to_type_name(inner_ds)
                func_name = f"fetch{type_name}"
            if func_name not in generated_funcs:
                generated_funcs.add(func_name)

                inner_clean = inner_ds.replace('ds_', '')
                inner_kebab = to_kebab_case(inner_clean)
                content += f"export const {func_name} = async () => {{\n"
                if code_str_argument:
                    content += f"  return apiGet<{type_name}[]>(\n"
                    content += f"    '{base_api_path}/options/{inner_kebab}',\n"
                    content += f"    undefined,\n"
                    content += f"    STR_ARGUMENT_CODE,\n"
                    content += f"  );\n"
                else:
                    content += f"  return apiGet<{type_name}[]>(\n"
                    content += f"    '{base_api_path}/options/{inner_kebab}',\n"
                    content += f"  );\n"
                content += "};\n\n"

    with open(api_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated API: api/{api_file_name}")

    # mocks.ts 생성
    generate_mocks_file(screen_name, data, output_dir, fetch_funcs, save_funcs, multi=multi)


def _find_filter_field_for_combo(combo, meta_data):
    """콤보에 대응하는 메인 데이터셋 필드 찾기"""
    inner_ds = combo.get('innerdataset', '')
    if inner_ds.startswith('@'):
        inner_ds = inner_ds[1:]

    grids = meta_data.get('Grids', [])
    if not grids:
        return None

    for grid in grids:
        columns = grid.get('columns', [])
        for col in columns:
            if col.get('combodataset', '') == inner_ds:
                binding = col.get('binding', '')
                if binding and not binding.startswith('expr:'):
                    return binding

    return None


if __name__ == "__main__":
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    generate_api_file(screen_name)
