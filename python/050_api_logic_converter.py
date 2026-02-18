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
            if col.get('edittype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    combo_datasets.append(combo_ds)
    return list(set(combo_datasets))


def get_auxiliary_datasets(meta_data):
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
            aux_datasets.append({
                'id': ds_id,
                'type': to_type_name(ds_id),
                'var': to_var_name(ds_id),
                'columns': ds.get('columns', []),
                'rows': ds.get('rows', [])
            })

    return aux_datasets


def build_sample_row(columns, row_data):
    """Dataset의 row 데이터를 TypeScript 객체 문자열로 변환"""
    parts = []
    for col in columns:
        col_id = col.get('id', '')
        if col_id and col_id != 'CUD_TYPE':
            camel_name = to_camel_case(col_id)
            value = row_data.get(col_id, '')
            parts.append(f"    {camel_name}: '{value}'")
    return "  {\n" + ",\n".join(parts) + ",\n  }"


def generate_mocks_file(screen_name, meta_data, output_dir):
    """mocks.ts 생성 - MSW 기반 Mock 핸들러

    - GET: 메인 데이터 (원본 컬럼명 camelCase)
    - POST: 저장 (echo 응답)
    - GET: 각 보조 데이터셋 옵션
    """
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]
    kebab_name = to_kebab_case(screen_name) if '_' in screen_name else screen_name.lower()

    main_ds_id = get_main_grid_dataset(meta_data)
    datasets = meta_data.get('Datasets', [])
    combos = meta_data.get('Combos', [])
    grids = meta_data.get('Grids', [])

    # 메인 데이터셋 컬럼
    main_columns = []
    main_rows = []
    for ds in datasets:
        if ds.get('id') == main_ds_id:
            main_columns = ds.get('columns', [])
            main_rows = ds.get('rows', [])
            break

    # 보조 데이터셋 (콤보에서 참조)
    aux_datasets = get_auxiliary_datasets(meta_data)

    # 검색 콤보의 innerdataset도 포함
    search_combo_ds = set()
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            search_combo_ds.add(inner_ds)

    camel_name = to_camel_case(screen_name) if '_' in screen_name else screen_name
    base_url = f"/api/bff/basic-infos/ai-transform/{kebab_name}"

    content = "import { http, HttpResponse } from 'msw';\n\n"
    content += f"export const {camel_name}Handlers = [\n"

    # GET: 메인 데이터
    content += f"  http.get('{base_url}', async () => {{\n"
    content += "    return HttpResponse.json({ message: [\n"

    if main_rows:
        for row in main_rows[:3]:
            content += "      { "
            parts = []
            for col in main_columns:
                col_id = col.get('id', '')
                if col_id:
                    camel_col = to_camel_case(col_id)
                    value = row.get(col_id, '')
                    parts.append(f"{camel_col}: '{value}'")
            content += ", ".join(parts)
            content += " },\n"

    content += "    ] });\n"
    content += "  }),\n\n"

    # GET: 추가 그리드 데이터 (멀티 그리드)
    if len(grids) > 1:
        for gi in range(1, len(grids)):
            grid = grids[gi]
            grid_id = grid.get('id', f'datagrid{gi+1}')
            grid_kebab = to_kebab_case(grid_id)

            content += f"  http.get('{base_url}/{grid_kebab}', async () => {{\n"
            content += "    return HttpResponse.json({ message: [\n"
            content += "    ] });\n"
            content += "  }),\n\n"

    # POST: 저장
    content += f"  http.post('{base_url}/commands/save', async ({{ request }}) => {{\n"
    content += "    const payload = await request.json();\n"
    content += "    return HttpResponse.json({ message: payload });\n"
    content += "  }),\n\n"

    # GET: 각 보조 데이터셋 옵션
    generated_option_endpoints = set()

    for ds in aux_datasets:
        ds_id = ds['id']
        if ds_id in generated_option_endpoints:
            continue
        generated_option_endpoints.add(ds_id)

        option_kebab = to_kebab_case(ds_id.replace('ds_', ''))
        ds_columns = ds.get('columns', [])
        ds_rows = ds.get('rows', [])

        content += f"  http.get('{base_url}/options/{option_kebab}', () => HttpResponse.json({{ message: [\n"

        if ds_rows:
            for row in ds_rows[:5]:
                content += "    { "
                parts = []
                for col in ds_columns:
                    col_id = col.get('id', '')
                    if col_id:
                        camel_col = to_camel_case(col_id)
                        value = row.get(col_id, '')
                        parts.append(f"{camel_col}: '{value}'")
                content += ", ".join(parts)
                content += " },\n"

        content += "  ] })),\n"

    # 검색 콤보용 데이터셋 (aux에 포함 안된 것)
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds and inner_ds not in generated_option_endpoints:
            generated_option_endpoints.add(inner_ds)

            option_kebab = to_kebab_case(inner_ds.replace('ds_', ''))
            # 데이터셋 찾기
            ds_info = None
            for d in datasets:
                if d.get('id') == inner_ds:
                    ds_info = d
                    break

            ds_columns = ds_info.get('columns', []) if ds_info else []
            ds_rows = ds_info.get('rows', []) if ds_info else []

            content += f"  http.get('{base_url}/options/{option_kebab}', () => HttpResponse.json({{ message: [\n"

            if ds_rows:
                for row in ds_rows[:5]:
                    content += "    { "
                    parts = []
                    for col in ds_columns:
                        col_id = col.get('id', '')
                        if col_id:
                            camel_col = to_camel_case(col_id)
                            value = row.get(col_id, '')
                            parts.append(f"{camel_col}: '{value}'")
                    content += ", ".join(parts)
                    content += " },\n"

            content += "  ] })),\n"

    content += "];\n"

    api_dir = os.path.join(output_dir, "api")
    os.makedirs(api_dir, exist_ok=True)
    mocks_file = os.path.join(api_dir, "mocks.ts")
    with open(mocks_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated API: api/mocks.ts")


def generate_api_file(screen_name=None):
    """화면별 단일 API 파일 생성 (v2.0)

    - normalizeFilterValue import
    - ApiResponse<T> 반환 타입
    - SearchParams 파라미터
    - 샘플 데이터
    - try/catch 제거
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
    datasets = data.get('Datasets', [])
    combos = data.get('Combos', [])
    aux_datasets = get_auxiliary_datasets(data)
    form_id = data.get('Form', {}).get('id', screen_name)

    # 메인 데이터셋의 컬럼 가져오기
    main_columns = []
    main_rows = []
    for ds in datasets:
        if ds.get('id') == main_ds_id:
            main_columns = ds.get('columns', [])
            main_rows = ds.get('rows', [])
            break

    # innerdataset이 있는 콤보만 검색 파라미터로 사용
    search_combos = [c for c in combos if c.get('innerdataset', '').lstrip('@')]
    has_search_params = len(search_combos) > 0

    print(f"Processing API for {folder_name}...")

    # API 파일명: camelCase + Api 접미사
    api_file_name = f"{camel_name}Api.ts"
    api_file = os.path.join(api_dir, api_file_name)

    # === Import Section ===
    content = "import { apiPost } from '@/api/httpClient';\n"
    content += "import { normalizeFilterValue } from '@/lib/utils';\n"

    # Type imports
    type_imports = [f"{component_name}Row"]
    if has_search_params:
        type_imports.append(f"{component_name}SearchParams")
    for ds in aux_datasets:
        type_imports.append(ds['type'])

    content += f"import type {{ {', '.join(type_imports)} }} from '../types/{component_name}Types';\n"
    content += "import type { ApiResponse } from '@/api/httpClient';\n"

    # === 샘플 데이터 상수 ===
    data_const_name = f"{form_id.upper().replace(' ', '_')}_DATA"
    content += f"\nconst {data_const_name}: {component_name}Row[] = [\n"

    if main_rows:
        # Dataset에 실제 rows가 있으면 사용
        for row in main_rows[:3]:
            content += build_sample_row(main_columns, row) + ",\n"
    # rows가 없으면 빈 배열 유지

    content += "];\n\n"

    # === 메인 데이터 조회 (fetch) ===
    if has_search_params:
        content += f"export const fetch{component_name}s = async (params?: {component_name}SearchParams) => {{\n"
        # normalizeFilterValue로 각 파라미터 추출
        for combo in search_combos:
            combo_id = combo.get('id', '')
            camel_id = to_camel_case(combo_id)
            content += f"  const {camel_id} = normalizeFilterValue(params?.{camel_id});\n"
        content += "\n"
        content += f"  const filtered = {data_const_name}.filter((row) => {{\n"
        # 필터 로직: 각 combo 파라미터에 대해 매칭하는 컬럼 찾기
        for combo in search_combos:
            combo_id = combo.get('id', '')
            camel_id = to_camel_case(combo_id)
            # combo에 연결된 데이터셋으로 매칭하는 row 필드 찾기
            match_field = _find_filter_field_for_combo(combo, data)
            if match_field:
                content += f"    if ({camel_id} && row.{to_camel_case(match_field)} !== {camel_id}) return false;\n"
        content += "    return true;\n"
        content += "  });\n\n"
    else:
        content += f"export const fetch{component_name}s = async () => {{\n"
        content += f"  const filtered = {data_const_name};\n\n"

    content += f"  const response: ApiResponse<{component_name}Row[]> = {{\n"
    content += "    result: 'true',\n"
    content += "    message: '',\n"
    content += "    responseBody: filtered,\n"
    content += "  };\n"
    content += "  return Promise.resolve(response);\n"
    content += "};\n\n"

    # === 메인 데이터 저장 (save) ===
    # kebab-case 엔드포인트 생성
    kebab_name = to_kebab_case(screen_name) if '_' in screen_name else screen_name.lower()
    content += f"export const save{component_name}s = async (dsName: string, payload: {component_name}Row[]) =>\n"
    content += f"  apiPost<{component_name}Row>('/{kebab_name}', dsName, payload);\n\n"

    # === 추가 그리드 데이터 조회 (멀티 그리드) ===
    grids = data.get('Grids', [])
    if len(grids) > 1:
        for gi in range(1, len(grids)):
            grid = grids[gi]
            grid_id = grid.get('id', f'datagrid{gi+1}')
            func_name = f"fetch{component_name}{to_pascal_case(grid_id)}"

            if has_search_params:
                content += f"export const {func_name} = async (params?: {component_name}SearchParams) => {{\n"
                for combo in search_combos:
                    combo_id = combo.get('id', '')
                    camel_id = to_camel_case(combo_id)
                    content += f"  const {camel_id} = normalizeFilterValue(params?.{camel_id});\n"
                content += "\n"
            else:
                content += f"export const {func_name} = async () => {{\n"

            content += f"  const response: ApiResponse<{component_name}Row[]> = {{\n"
            content += "    result: 'true',\n"
            content += "    message: '',\n"
            content += "    responseBody: [],\n"
            content += "  };\n"
            content += "  return Promise.resolve(response);\n"
            content += "};\n\n"

    # === 보조 Dataset fetch 함수 생성 ===
    generated_funcs = {f"fetch{component_name}s", f"save{component_name}s"}

    for ds in aux_datasets:
        func_name = f"fetch{ds['type']}"
        if func_name in generated_funcs:
            continue
        generated_funcs.add(func_name)

        ds_rows = ds.get('rows', [])
        ds_columns = ds.get('columns', [])

        content += f"export const {func_name} = async () => {{\n"
        content += f"  return new Promise<ApiResponse<{ds['type']}[]>>(resolve => {{\n"
        content += "    setTimeout(() => {\n"
        content += "      resolve({\n"
        content += "        result: 'true',\n"
        content += "        message: '',\n"
        content += "        responseBody: [\n"

        if ds_rows:
            for row in ds_rows[:5]:
                content += "          { "
                parts = []
                for col in ds_columns:
                    col_id = col.get('id', '')
                    if col_id:
                        camel_col = to_camel_case(col_id)
                        value = row.get(col_id, '')
                        parts.append(f"{camel_col}: '{value}'")
                content += ", ".join(parts)
                content += " },\n"
        # ds_rows가 없으면 빈 배열 반환

        content += "        ],\n"
        content += "      });\n"
        content += "    }, 2_000);\n"
        content += "  });\n"
        content += "};\n\n"

    # 조회조건 콤보에 연결된 데이터셋이 그리드 콤보와 다른 경우 추가 생성
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            type_name = to_type_name(inner_ds)
            func_name = f"fetch{type_name}"
            if func_name not in generated_funcs:
                generated_funcs.add(func_name)
                # 데이터셋 찾기
                ds_info = None
                for ds in datasets:
                    if ds.get('id') == inner_ds:
                        ds_info = ds
                        break

                ds_columns = ds_info.get('columns', []) if ds_info else []
                ds_rows = ds_info.get('rows', []) if ds_info else []

                content += f"export const {func_name} = async () => {{\n"
                content += f"  return new Promise<ApiResponse<{type_name}[]>>(resolve => {{\n"
                content += "    setTimeout(() => {\n"
                content += "      resolve({\n"
                content += "        result: 'true',\n"
                content += "        message: '',\n"
                content += "        responseBody: [\n"

                if ds_rows:
                    for row in ds_rows[:5]:
                        content += "          { "
                        parts = []
                        for col in ds_columns:
                            col_id = col.get('id', '')
                            if col_id:
                                camel_col = to_camel_case(col_id)
                                value = row.get(col_id, '')
                                parts.append(f"{camel_col}: '{value}'")
                        content += ", ".join(parts)
                        content += " },\n"
                # ds_rows가 없으면 빈 배열 반환

                content += "        ],\n"
                content += "      });\n"
                content += "    }, 2_000);\n"
                content += "  });\n"
                content += "};\n\n"

    with open(api_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated API: api/{api_file_name}")

    # mocks.ts 생성
    generate_mocks_file(screen_name, data, output_dir)


def _resolve_combo_label(combo, statics):
    """콤보 라벨 결정 (050용 복사)
    1. combo.label 존재 시 사용
    2. Statics cell_title 근접매칭
    3. fallback: combo id
    """
    label = combo.get('label', '')
    if label:
        return label

    combo_left = _parse_pos(combo.get('left', '0'))
    combo_top = _parse_pos(combo.get('top', '0'))

    cell_titles = [s for s in statics if s.get('cssclass', '') == 'cell_title' and s.get('text', '')]
    if cell_titles:
        best = None
        best_dist = float('inf')
        for ct in cell_titles:
            ct_left = _parse_pos(ct.get('left', '0'))
            ct_top = _parse_pos(ct.get('top', '0'))
            if abs(ct_top - combo_top) <= 10 and ct_left < combo_left:
                dist = combo_left - ct_left
                if dist < best_dist:
                    best_dist = dist
                    best = ct
        if best:
            return best.get('text', combo.get('id', ''))

    return combo.get('id', '')


def _parse_pos(val):
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0


def _find_filter_field_for_combo(combo, meta_data):
    """콤보에 대응하는 메인 데이터셋 필드 찾기

    매칭 전략:
    1. combo.innerdataset == grid column.combodataset → 해당 binding
    2. combo label(해결) == grid column.id(헤더 텍스트) → 해당 binding
    """
    inner_ds = combo.get('innerdataset', '')
    if inner_ds.startswith('@'):
        inner_ds = inner_ds[1:]

    grids = meta_data.get('Grids', [])
    if not grids:
        return None

    # 전략 1: innerdataset ↔ combodataset 매칭
    for grid in grids:
        columns = grid.get('columns', [])
        for col in columns:
            if col.get('combodataset', '') == inner_ds:
                binding = col.get('binding', '')
                if binding and not binding.startswith('expr:'):
                    return binding

    # 전략 2: 콤보 라벨 ↔ 그리드 컬럼 헤더(id) 텍스트 매칭
    statics = meta_data.get('Statics', [])
    combo_label = _resolve_combo_label(combo, statics)

    if combo_label:
        for grid in grids:
            columns = grid.get('columns', [])
            for col in columns:
                col_header = col.get('id', '')
                binding = col.get('binding', '')
                if col_header == combo_label and binding and not binding.startswith('expr:'):
                    return binding

    return None


if __name__ == "__main__":
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    generate_api_file(screen_name)
