import os
import sys
import json
import re

# Configuration (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(text):
    if not text:
        return ""
    words = text.split('_')
    return ''.join(word.capitalize() for word in words)


def to_camel_case(text):
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:] if pascal else ''


def to_kebab_case(text):
    if not text:
        return ""
    return text.lower().replace('_', '-')


def to_type_name(ds_id):
    if not ds_id:
        return ""
    components = ds_id.split('_')
    return ''.join((x[0].upper() + x[1:]) if x else '' for x in components)


def to_var_name(ds_id):
    tn = to_type_name(ds_id)
    return tn[0].lower() + tn[1:] if tn else ''


def capitalize_first(s):
    return s[0].upper() + s[1:] if s else ''


def ds_id_to_row_type_name(ds_id):
    return to_type_name(ds_id) + 'Row'


def ds_id_to_create_func_name(ds_id):
    clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
    return f"create{clean}Row"


def ds_id_to_option_type_name(ds_id):
    return to_type_name(ds_id) + 'Option'


def ds_id_to_option_var_name(ds_id):
    return to_var_name(ds_id) + 'Options'


def is_multi_grid(meta_data):
    return len(meta_data.get('Grids', [])) > 1


def resolve_combo_search_field_name(combo, datasets):
    """콤보의 SearchParams 필드명 결정 (멀티 그리드용)"""
    codecolumn = combo.get('codecolumn', 'COMM_CODE')
    if codecolumn and codecolumn != 'COMM_CODE':
        return to_camel_case(codecolumn)
    inner_ds = combo.get('innerdataset', '').lstrip('@')
    if inner_ds:
        clean = inner_ds.replace('ds_', '') if inner_ds.startswith('ds_') else inner_ds
        # Preserve internal casing (PrdCi → prdCi, not prdci)
        return clean[0].lower() + clean[1:] if clean else ''
    return to_camel_case(combo.get('id', ''))


def grid_id_to_prop_name(grid_id):
    """그리드 ID에서 prop 이름 추출 (grd_Proc -> Proc, grd_GridT2 -> Tab2)"""
    clean = grid_id.replace('grd_', '') if grid_id.startswith('grd_') else grid_id
    return clean


def get_multi_grid_api_func_name(direction, transition, ds_id):
    """멀티 그리드용 API 함수명 (060에서도 사용)"""
    clean_ds = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
    transition_pascal = capitalize_first(to_camel_case(transition)) if transition else ''
    return f"{direction}{clean_ds}RowsBy{transition_pascal}"


def extract_dataset_id(ds_mapping):
    if not ds_mapping:
        return None
    if '=' in ds_mapping:
        return ds_mapping.split('=')[0].strip()
    return ds_mapping.strip()


def get_main_grid_dataset(meta_data):
    grids = meta_data.get('Grids', [])
    if grids:
        return grids[0].get('binddataset', '')
    return None


def get_all_grid_dataset_ids(meta_data):
    grids = meta_data.get('Grids', [])
    return {g.get('binddataset', '') for g in grids if g.get('binddataset', '')}


def get_grid_titles(meta_data):
    grids = meta_data.get('Grids', [])
    statics = meta_data.get('Statics', [])
    sub_titles = [s for s in statics if s.get('cssclass', '') == 'sub_title' and s.get('text', '')]
    titles = []
    for grid in grids:
        grid_left = _parse_position(grid.get('left', '0'))
        grid_top = _parse_position(grid.get('top', '0'))
        best = None
        best_dist = float('inf')
        for st in sub_titles:
            st_left = _parse_position(st.get('left', '0'))
            st_top = _parse_position(st.get('top', '0'))
            if st_top <= grid_top:
                dist = abs(st_left - grid_left) + (grid_top - st_top)
                if dist < best_dist:
                    best_dist = dist
                    best = st
        titles.append(best.get('text', '') if best else None)
    return titles


def get_combo_datasets_for_grid(meta_data):
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


def get_lookup_datasets(meta_data):
    grid_ds_ids = get_all_grid_dataset_ids(meta_data)
    datasets = meta_data.get('Datasets', [])
    combos = meta_data.get('Combos', [])
    combo_ds_ids = set()
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            combo_ds_ids.add(inner_ds)
    grid_combo_ds = get_combo_datasets_for_grid(meta_data)
    combo_ds_ids.update(grid_combo_ds)
    lookup_datasets = []
    for ds in datasets:
        ds_id = ds.get('id', '')
        if ds_id not in grid_ds_ids and ds_id in combo_ds_ids:
            lookup_datasets.append({
                'id': ds_id,
                'type': to_type_name(ds_id),
                'var': to_var_name(ds_id)
            })
    return lookup_datasets


def resolve_combo_label(combo, statics):
    label = combo.get('label', '')
    if label:
        return label
    combo_left = _parse_position(combo.get('left', '0'))
    combo_top = _parse_position(combo.get('top', '0'))
    cell_titles = [s for s in statics if s.get('cssclass', '') == 'cell_title' and s.get('text', '')]
    if cell_titles:
        best = None
        best_dist = float('inf')
        for ct in cell_titles:
            ct_left = _parse_position(ct.get('left', '0'))
            ct_top = _parse_position(ct.get('top', '0'))
            if abs(ct_top - combo_top) <= 10 and ct_left < combo_left:
                dist = combo_left - ct_left
                if dist < best_dist:
                    best_dist = dist
                    best = ct
        if best:
            return best.get('text', combo.get('id', ''))
    return combo.get('id', '')


def _parse_position(val):
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0


def assign_grids_to_splitter_panels(grids, splitter):
    orientation = splitter.get('orientation', 'vertical')
    if orientation == 'vertical':
        splitter_pos = _parse_position(splitter.get('left', '0'))
        pos_key = 'left'
    else:
        splitter_pos = _parse_position(splitter.get('top', '0'))
        pos_key = 'top'
    panel1 = []
    panel2 = []
    unassigned = []
    for i, grid in enumerate(grids):
        pos_str = str(grid.get(pos_key, '0'))
        if '%' in pos_str:
            unassigned.append(i)
            continue
        pos = _parse_position(pos_str)
        if pos < splitter_pos:
            panel1.append(i)
        else:
            panel2.append(i)
    return panel1, panel2, unassigned


def get_screen_title(meta_data):
    form = meta_data.get('Form', {})
    if form.get('titletext', ''):
        return form['titletext']
    statics = meta_data.get('Statics', [])
    for s in statics:
        if s.get('cssclass', '') == 'title' and s.get('text', ''):
            return s['text']
    for s in statics:
        if s.get('cssclass', '') == 'sub_title' and s.get('text', ''):
            return s['text']
    return '화면제목'


def get_api_func_name(direction, component_name, transition, ds_id=None, main_ds_id=None):
    if not transition:
        return f"fetch{component_name}s" if direction == 'fetch' else f"post{component_name}s"
    transition_pascal = capitalize_first(transition)
    if not ds_id or ds_id == main_ds_id:
        target = component_name + 's'
    else:
        target = to_type_name(ds_id)
    return f"{direction}{target}By{transition_pascal}"


def compute_api_func_names(scripts, component_name, main_ds_id, grid_ds_ids=None, multi=False):
    """그리드 바인딩 데이터셋 대상 트랜잭션만 fetch/save 함수명 계산"""
    if grid_ds_ids is None:
        grid_ds_ids = {main_ds_id} if main_ds_id else set()
    gfn_txns = [s for s in scripts if s.get('name') in ('gfn_Transaction', 'gfn_DsSetTransaction')]
    fetch_funcs = []
    save_funcs = []
    for txn in gfn_txns:
        transition = txn.get('strTransition', '')
        out_ds = txn.get('strOutDatasets', '')
        in_ds = txn.get('strInDatasets', '')
        if out_ds:
            out_ds_id = extract_dataset_id(out_ds)
            if out_ds_id in grid_ds_ids:
                if multi:
                    func_name = get_multi_grid_api_func_name('fetch', transition, out_ds_id)
                else:
                    func_name = get_api_func_name('fetch', component_name, transition, out_ds_id, main_ds_id)
                fetch_funcs.append({'name': func_name, 'dsId': out_ds_id, 'transition': transition})
        if in_ds:
            in_ds_id = extract_dataset_id(in_ds)
            if in_ds_id in grid_ds_ids:
                if multi:
                    func_name = get_multi_grid_api_func_name('post', transition, in_ds_id)
                else:
                    func_name = get_api_func_name('post', component_name, transition, in_ds_id, main_ds_id)
                save_funcs.append({'name': func_name, 'dsId': in_ds_id, 'transition': transition})
    if not fetch_funcs:
        fetch_funcs.append({'name': f"fetch{component_name}s", 'dsId': main_ds_id, 'transition': ''})
    if not save_funcs:
        save_funcs.append({'name': f"post{component_name}s", 'dsId': main_ds_id, 'transition': ''})

    # Multi-grid: 트랜잭션으로 커버되지 않은 그리드 데이터셋에 fallback fetch 추가
    if multi and grid_ds_ids:
        covered_fetch_ds = set(ff['dsId'] for ff in fetch_funcs)
        for ds_id in sorted(grid_ds_ids):
            if ds_id not in covered_fetch_ds:
                clean_ds = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
                fetch_funcs.append({'name': f"fetch{clean_ds}Rows", 'dsId': ds_id, 'transition': ''})

    return fetch_funcs, save_funcs


# ============================================================
# View 생성
# ============================================================

def generate_view(meta_data, output_dir, screen_name):
    """Generate {ScreenName}View.tsx - v4.0
    멀티 그리드: ResizableSplitView, t() 탭 라벨, keepMounted, 그리드 ID 기반 prop 이름
    단일 그리드: 기존 패턴 유지
    """
    view_name = f"{screen_name}View"
    grids = meta_data.get('Grids', [])
    splitters = meta_data.get('Splitters', [])
    tabs = meta_data.get('Tabs', [])
    has_grid = len(grids) > 0
    multi = is_multi_grid(meta_data)
    has_splitter = len(splitters) > 0
    has_tabs = len(tabs) > 0 and len(tabs[0].get('tabpages', [])) > 1
    tab_pages = tabs[0].get('tabpages', []) if has_tabs else []
    grid_titles = get_grid_titles(meta_data) if multi else []

    # 수평 멀티 그리드 판별 (splitter/tab 없는 side-by-side 2그리드)
    _grid_lefts = [_parse_position(g.get('left', '0')) for g in grids] if grids else []
    is_horizontal_multi = (
        multi and not has_splitter and not has_tabs
        and len(grids) == 2
        and _grid_lefts
        and (max(_grid_lefts) - min(_grid_lefts)) >= 50
    )

    splitter_panel1 = []
    splitter_panel2 = []
    splitter_unassigned = []
    if has_splitter and multi:
        splitter_panel1, splitter_panel2, splitter_unassigned = assign_grids_to_splitter_panels(grids, splitters[0])

    if has_tabs:
        assigned_grid_indices = list(range(len(grids)))
    elif has_splitter and multi:
        assigned_grid_indices = splitter_panel1 + splitter_panel2
    else:
        assigned_grid_indices = list(range(len(grids)))

    # 그리드 ID 기반 prop 이름 생성 (멀티 그리드)
    def _grid_prop_name(gi):
        """그리드 인덱스에서 prop 이름 생성"""
        if multi:
            grid = grids[gi]
            grid_id = grid.get('id', f'datagrid{gi+1}')
            # grd_Proc -> onProcGridInitialized
            # grd_ProcDtl -> onProcDtlGridInitialized
            # grd_GridT2 -> ds_Tab2에 바인딩되므로 onTab2GridInitialized
            ds_id = grid.get('binddataset', '')
            if ds_id:
                clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
                return f"on{clean}GridInitialized"
            clean = grid_id.replace('grd_', '') if grid_id.startswith('grd_') else grid_id
            return f"on{clean}GridInitialized"
        else:
            return "onGridInitialized"

    # === Import Section ===
    content = ""
    if has_grid:
        content += "import type { FlexGrid } from '@mescius/wijmo.grid';\n\n"

    if has_tabs:
        content += "import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';\n"

    content += "import { ViewFill } from '@/components/layout/ViewFill';\n"
    content += "import CommonButtons from '@/components/common-control/CommonButtons';\n"

    if (has_splitter and multi) or is_horizontal_multi:
        content += "import { ResizableSplitView } from '@/components/layout/ResizableSplitView';\n"

    content += "import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';\n"

    # === Props Type ===
    content += f"\nexport type {view_name}Props = {{\n"
    if multi:
        content += "  t: (key: string) => string;\n"
    content += "  commonButtonsProps: CommonButtonsProps;\n"
    content += "  searchSection?: React.ReactNode;\n"

    if has_tabs:
        content += "  activeTab: string;\n"
        content += "  onTabChange: (value: string) => void;\n"

    if has_splitter and not multi:
        for splitter in splitters:
            orientation = splitter.get('orientation', 'vertical')
            if orientation == 'vertical':
                content += "  leftPanelContent?: React.ReactNode;\n"
                content += "  rightPanelContent?: React.ReactNode;\n"
            else:
                content += "  topPanelContent?: React.ReactNode;\n"
                content += "  bottomPanelContent?: React.ReactNode;\n"

    if multi:
        for i in assigned_grid_indices:
            content += f"  {_grid_prop_name(i)}: (grid: FlexGrid) => void;\n"
    elif has_grid:
        content += "  onGridInitialized: (grid: FlexGrid) => void;\n"

    content += "};\n"

    # === Component ===
    content += f"\nconst {view_name} = (props: {view_name}Props) => {{\n"
    content += "  const {\n"
    if multi:
        content += "    t,\n"
    content += "    commonButtonsProps,\n"
    content += "    searchSection,\n"
    if has_tabs:
        content += "    activeTab,\n"
        content += "    onTabChange,\n"
    if has_splitter and not multi:
        for splitter in splitters:
            orientation = splitter.get('orientation', 'vertical')
            if orientation == 'vertical':
                content += "    leftPanelContent,\n"
                content += "    rightPanelContent,\n"
            else:
                content += "    topPanelContent,\n"
                content += "    bottomPanelContent,\n"
    if multi:
        for i in assigned_grid_indices:
            content += f"    {_grid_prop_name(i)},\n"
    elif has_grid:
        content += "    onGridInitialized,\n"
    content += "  } = props;\n"

    # === JSX Return ===
    content += "\n  return (\n"
    content += "    <ViewFill variant=\"root\">\n"
    content += "      <CommonButtons {...commonButtonsProps} />\n"
    content += "      <header className=\"shrink-0\">\n"
    content += "        {searchSection}\n"
    content += "      </header>\n"

    # === 탭 화면: Tabs/TabsList/TabsTrigger/TabsContent ===
    if has_tabs:
        # tab value 이름: tabpage1 → "register", tabpage2 → "status"
        def _tab_value(tab_idx, tab_page):
            tp_id = tab_page.get('id', f'tabpage{tab_idx+1}')
            if tab_idx == 0:
                return 'register'
            elif tab_idx == 1:
                return 'status'
            return f"tab{tab_idx}"

        content += "      <Tabs value={activeTab} onValueChange={onTabChange}>\n"
        content += "        <TabsList>\n"
        for tab_idx, tab_page in enumerate(tab_pages):
            tab_text = tab_page.get('text', f'Tab {tab_idx + 1}')
            tab_val = _tab_value(tab_idx, tab_page)
            if multi:
                content += f"          <TabsTrigger value=\"{tab_val}\">{{t('{tab_text}')}}</TabsTrigger>\n"
            else:
                content += f"          <TabsTrigger value=\"{tab_val}\">{tab_text}</TabsTrigger>\n"
        content += "        </TabsList>\n"

        # Tab 0 (register)
        tab0_val = _tab_value(0, tab_pages[0])
        if has_splitter and multi and splitter_panel1:
            content += f"        <TabsContent value=\"{tab0_val}\" keepMounted>\n"
            content += "          <ResizableSplitView\n"
            content += "            primary={\n"
            content += f"              <wjGrid.FlexGrid\n"
            content += f"                autoGenerateColumns={{false}}\n"
            content += f"                initialized={{{_grid_prop_name(splitter_panel1[0])}}}\n"
            content += f"                style={{{{ height: '100%' }}}}\n"
            content += f"              />\n"
            content += "            }\n"
            content += "            secondary={\n"
            content += f"              <wjGrid.FlexGrid\n"
            content += f"                autoGenerateColumns={{false}}\n"
            content += f"                initialized={{{_grid_prop_name(splitter_panel2[0])}}}\n"
            content += f"                style={{{{ height: '100%' }}}}\n"
            content += f"              />\n"
            content += "            }\n"
            content += "          />\n"
            content += "        </TabsContent>\n"
        else:
            tab0_grids = splitter_panel1 + splitter_panel2 if (splitter_panel1 or splitter_panel2) else list(range(min(1, len(grids))))
            if tab0_grids:
                content += f"        <TabsContent value=\"{tab0_val}\" keepMounted>\n"
                for gi in tab0_grids:
                    content += f"          <wjGrid.FlexGrid\n"
                    content += f"            autoGenerateColumns={{false}}\n"
                    content += f"            initialized={{{_grid_prop_name(gi)}}}\n"
                    content += f"            style={{{{ height: '100%' }}}}\n"
                    content += f"          />\n"
                content += "        </TabsContent>\n"

        # Tab 1+ (status, etc.)
        for tab_idx in range(1, len(tab_pages)):
            tab_val = _tab_value(tab_idx, tab_pages[tab_idx])
            content += f"        <TabsContent value=\"{tab_val}\" keepMounted>\n"
            if tab_idx == 1 and splitter_unassigned:
                for gi in splitter_unassigned:
                    content += f"          <wjGrid.FlexGrid\n"
                    content += f"            autoGenerateColumns={{false}}\n"
                    content += f"            initialized={{{_grid_prop_name(gi)}}}\n"
                    content += f"            style={{{{ height: '100%' }}}}\n"
                    content += f"          />\n"
            else:
                content += f"          {{/* TODO: Tab {tab_idx + 1} content */}}\n"
            content += "        </TabsContent>\n"

        content += "      </Tabs>\n"

    # === 스플리터 + 멀티그리드 (탭 없음) ===
    elif has_splitter and multi:
        panel1, panel2, _ = assign_grids_to_splitter_panels(grids, splitters[0])
        content += "      <ViewFill>\n"
        # 한쪽 패널이 비어있으면 ResizableSplitView 없이 직접 렌더링
        if not panel1 or not panel2:
            all_panels = panel1 if panel1 else panel2
            for gi in all_panels:
                content += f"        <wjGrid.FlexGrid\n"
                content += f"          autoGenerateColumns={{false}}\n"
                content += f"          initialized={{{_grid_prop_name(gi)}}}\n"
                content += f"          style={{{{ height: '100%' }}}}\n"
                content += f"        />\n"
        else:
            content += "        <ResizableSplitView\n"
            content += "          primary={\n"
            if len(panel1) > 1:
                content += "            <>\n"
            for gi in panel1:
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{{_grid_prop_name(gi)}}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            if len(panel1) > 1:
                content += "            </>\n"
            content += "          }\n"
            content += "          secondary={\n"
            if len(panel2) > 1:
                content += "            <>\n"
            for gi in panel2:
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{{_grid_prop_name(gi)}}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            if len(panel2) > 1:
                content += "            </>\n"
            content += "          }\n"
            content += "        />\n"
        content += "      </ViewFill>\n"

    elif has_splitter:
        splitter = splitters[0]
        orientation = splitter.get('orientation', 'vertical')
        content += "      <ViewFill>\n"
        if orientation == 'vertical':
            content += "        <div className=\"flex h-full\">\n"
            content += "          <div className=\"flex-1 min-w-0\">{leftPanelContent}</div>\n"
            content += "          <div className=\"flex-1 min-w-0\">{rightPanelContent}</div>\n"
            content += "        </div>\n"
        else:
            content += "        <div className=\"flex flex-col h-full\">\n"
            content += "          <div className=\"flex-1 min-h-0\">{topPanelContent}</div>\n"
            content += "          <div className=\"flex-1 min-h-0\">{bottomPanelContent}</div>\n"
            content += "        </div>\n"
        content += "      </ViewFill>\n"

    elif multi:
        grid_lefts = [_parse_position(g.get('left', '0')) for g in grids]
        is_vertical_layout = (max(grid_lefts) - min(grid_lefts)) < 50 if grid_lefts else False

        if is_horizontal_multi:
            # 수평 2그리드: ResizableSplitView 사용 (원본 패턴)
            def _build_grid_panel(gi):
                title = grid_titles[gi] if gi < len(grid_titles) else None
                panel = ""
                panel += "          <ViewFill variant='root'>\n"
                if title:
                    panel += f"            <div>{title}</div>\n"
                panel += f"            <wjGrid.FlexGrid\n"
                panel += f"              autoGenerateColumns={{false}}\n"
                panel += f"              initialized={{{_grid_prop_name(gi)}}}\n"
                panel += f"              style={{{{ height: '100%' }}}}\n"
                panel += f"            />\n"
                panel += "          </ViewFill>\n"
                return panel

            content += "        <ResizableSplitView\n"
            content += "          primary={\n"
            content += _build_grid_panel(0)
            content += "          }\n"
            content += "          secondary={\n"
            content += _build_grid_panel(1)
            content += "          }\n"
            content += "        />\n"
        elif is_vertical_layout:
            content += "      <div className=\"flex flex-col gap-2\" style={{ flex: 1, minHeight: 0 }}>\n"
            for i, grid in enumerate(grids):
                title = grid_titles[i] if i < len(grid_titles) else None
                content += "        <ViewFill>\n"
                if title:
                    content += f"          <div className=\"text-sm font-medium py-1\">{title}</div>\n"
                content += f"          <wjGrid.FlexGrid\n"
                content += f"            autoGenerateColumns={{false}}\n"
                content += f"            initialized={{{_grid_prop_name(i)}}}\n"
                content += f"            style={{{{ height: '100%' }}}}\n"
                content += f"          />\n"
                content += "        </ViewFill>\n"
            content += "      </div>\n"
        else:
            content += "      <div className=\"flex h-full gap-4\" style={{ flex: 1, minHeight: 0 }}>\n"
            for i, grid in enumerate(grids):
                title = grid_titles[i] if i < len(grid_titles) else None
                content += "        <ViewFill>\n"
                if title:
                    content += f"          <div className=\"text-sm font-medium py-1\">{title}</div>\n"
                content += f"          <wjGrid.FlexGrid\n"
                content += f"            autoGenerateColumns={{false}}\n"
                content += f"            initialized={{{_grid_prop_name(i)}}}\n"
                content += f"            style={{{{ height: '100%' }}}}\n"
                content += f"          />\n"
                content += "        </ViewFill>\n"
            content += "      </div>\n"

    elif has_grid:
        content += "      <ViewFill>\n"
        content += "        <wjGrid.FlexGrid\n"
        content += "          autoGenerateColumns={false}\n"
        content += "          initialized={onGridInitialized}\n"
        content += "          style={{ height: '100%' }}\n"
        content += "        />\n"
        content += "      </ViewFill>\n"

    content += "    </ViewFill>\n"
    content += "  );\n"
    content += "};\n\n"
    content += f"export default {view_name};\n"

    # wjGrid import needed if grids exist (add at top after FlexGrid import)
    if has_grid:
        # Add wjGrid import after the FlexGrid type import
        wj_import = "import * as wjGrid from '@mescius/wijmo.react.grid';\n"
        content = wj_import + content

    file_path = os.path.join(output_dir, f"{view_name}.tsx")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {view_name}.tsx")
    return view_name


# ============================================================
# Page 생성
# ============================================================

def generate_page(meta_data, output_dir, screen_name, view_name, camel_name=None):
    """Generate {ScreenName}Page.tsx - v3.0
    API: fetch{Target}By{Transition}, Import: useCreateRows/useCreateGridColumns
    """
    page_name = f"{screen_name}Page"
    if camel_name is None:
        camel_name = to_camel_case(screen_name)
    api_file_name = f"{camel_name}Api"

    form_id = meta_data.get('Form', {}).get('id', screen_name)
    lookup_datasets = get_lookup_datasets(meta_data)
    grids = meta_data.get('Grids', [])
    combos = meta_data.get('Combos', [])
    statics = meta_data.get('Statics', [])
    datasets = meta_data.get('Datasets', [])
    scripts = meta_data.get('Scripts', [])
    has_grid = len(grids) > 0
    multi = len(grids) > 1
    splitters = meta_data.get('Splitters', [])
    has_splitter = len(splitters) > 0
    search_combos = [c for c in combos if c.get('innerdataset', '').lstrip('@')]
    if multi:
        search_combos.sort(key=lambda c: _parse_position(c.get('left', '0')))
    has_combos = len(search_combos) > 0
    tabs = meta_data.get('Tabs', [])
    has_tabs = len(tabs) > 0 and len(tabs[0].get('tabpages', [])) > 1

    if has_tabs:
        assigned_grid_indices = set(range(len(grids)))
    elif has_splitter and multi:
        panel1, panel2, _ = assign_grids_to_splitter_panels(grids, splitters[0])
        assigned_grid_indices = set(panel1 + panel2)
    else:
        assigned_grid_indices = set(range(len(grids)))

    form_id_upper = form_id.upper().replace(' ', '_')
    header_tree_name = f"{form_id_upper}_HEADER_TREE"
    grid_columns_name = f"{form_id_upper}_COLUMNS"

    main_ds_id = get_main_grid_dataset(meta_data)
    grid_ds_ids = get_all_grid_dataset_ids(meta_data)
    fetch_funcs, save_funcs = compute_api_func_names(scripts, screen_name, main_ds_id, grid_ds_ids, multi=multi)
    main_fetch_name = fetch_funcs[0]['name']
    main_save_name = save_funcs[0]['name']

    grid_infos = []
    if multi:
        for i, grid in enumerate(grids):
            if i not in assigned_grid_indices:
                continue
            ds_id = grid.get('binddataset', '')
            grid_id = grid.get('id', '')
            clean_ds = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
            row_type = ds_id_to_row_type_name(ds_id)
            create_func = ds_id_to_create_func_name(ds_id)
            # col_func: 040과 동일하게 grid ID 기반으로 생성
            clean_grid_id = grid_id.replace('grd_', '') if grid_id.startswith('grd_') else grid_id
            if clean_grid_id.startswith('Grid'):
                ds_clean = ds_id.replace('ds_', '') if ds_id and ds_id.startswith('ds_') else clean_grid_id
                col_func = f"create{ds_clean}GridColumns"
            else:
                col_func = f"create{clean_grid_id}GridColumns"
            clean_ds_camel = clean_ds[0].lower() + clean_ds[1:] if clean_ds else ''
            columns_var = f"{clean_ds_camel}GridColumns"
            grid_name_str = f"{clean_ds_camel}Grid"
            prop_name = f"on{clean_ds}GridInitialized"
            handler_prefix = clean_ds

            # Find fetch func for this dataset
            grid_fetch = None
            for ff in fetch_funcs:
                if ff['dsId'] == ds_id:
                    grid_fetch = ff['name']
                    break
            if not grid_fetch:
                grid_fetch = f"fetch{clean_ds}Rows"

            # Find save func for this dataset
            grid_save = None
            for sf in save_funcs:
                if sf['dsId'] == ds_id:
                    grid_save = sf['name']
                    break

            # Combo params (check both edittype and displaytype for combo)
            combo_params = []
            for col in grid.get('columns', []):
                is_combo = col.get('edittype') in ('combo',) or col.get('displaytype') == 'combo'
                if is_combo:
                    combo_ds = col.get('combodataset', '')
                    if combo_ds and not combo_ds.startswith('g_'):
                        param_name = ds_id_to_option_var_name(combo_ds)
                        if param_name not in [p['param'] for p in combo_params]:
                            combo_params.append({
                                'param': param_name,
                                'type': ds_id_to_option_type_name(combo_ds)
                            })

            grid_infos.append({
                'idx': i,
                'ds_id': ds_id,
                'row_type': row_type,
                'create_func': create_func,
                'col_func': col_func,
                'columns_var': columns_var,
                'grid_name': grid_name_str,
                'prop_name': prop_name,
                'handler_prefix': handler_prefix,
                'fetch_func': grid_fetch,
                'save_func': grid_save,
                'has_save': grid_save is not None,
                'combo_params': combo_params,
            })

    grid_col_func = ""
    if has_grid and not multi:
        grid_id = grids[0].get('id', 'datagrid1')
        grid_col_func = f"create{to_pascal_case(grid_id)}ColumnDefinition"

    grid_combo_params = []
    if has_grid and not multi:
        for col in grids[0].get('columns', []):
            if col.get('edittype') == 'combo' or col.get('displaytype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    param_name = to_var_name(combo_ds)
                    if param_name not in [p['param'] for p in grid_combo_params]:
                        grid_combo_params.append({'param': param_name, 'type': to_type_name(combo_ds)})

    has_auth_check = meta_data.get('hasAuthCheck', False)
    has_close_guard = meta_data.get('hasCloseGuard', False)
    screen_title = get_screen_title(meta_data)

    # === Imports ===
    content = "import { useCallback, useEffect, useMemo, useState } from 'react';\n"
    content += "import type { FlexGrid } from '@mescius/wijmo.grid';\n"
    content += "import { useGrid } from '@/components/ap-wijmo/grid/hooks/useGrid';\n"
    content += f"import {view_name} from './{view_name}';\n"

    if has_auth_check:
        content += "import { usePageCrudAuth } from '@/hooks/usePageCrudAuthCheck';\n"

    if has_combos:
        content += "import SearchConditionFields, {\n"
        content += "  type SearchConditionFieldConfig,\n"
        content += "  type SearchConditionValues,\n"
        content += "} from '@/components/ap-wijmo/search/SearchConditionFields';\n"

    if not multi:
        content += "import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';\n"
    content += "\n"

    # API imports
    api_funcs = []
    for ff in fetch_funcs:
        if ff['name'] not in api_funcs:
            api_funcs.append(ff['name'])
    for sf in save_funcs:
        if sf['name'] not in api_funcs:
            api_funcs.append(sf['name'])

    if multi:
        # Option fetch funcs from gfn_Code_Transaction
        code_transactions = [s for s in scripts if s.get('name') == 'gfn_Code_Transaction']
        for code_txn in code_transactions:
            for entry in code_txn.get('codeArr', []):
                target_ds = entry.get('targetDataset', '')
                if target_ds:
                    clean_name = target_ds[3:] if target_ds.startswith('ds_') else target_ds
                    func_name = f"fetchDs{clean_name}Options"
                    if func_name not in api_funcs:
                        api_funcs.append(func_name)
        # Option fetch funcs from gfn_DsSetTransaction non-grid
        ds_set_txns = [s for s in scripts if s.get('name') == 'gfn_DsSetTransaction']
        for txn in ds_set_txns:
            out_ds = txn.get('strOutDatasets', '')
            if out_ds:
                out_ds_id = extract_dataset_id(out_ds)
                if out_ds_id and out_ds_id not in grid_ds_ids:
                    transition = txn.get('strTransition', '')
                    func_name = f"fetch{to_type_name(out_ds_id)}OptionsBy{capitalize_first(to_camel_case(transition))}"
                    if func_name not in api_funcs:
                        api_funcs.append(func_name)
    else:
        for ds in lookup_datasets:
            func_name = f"fetch{ds['type']}"
            if func_name not in api_funcs:
                api_funcs.append(func_name)
        for combo in combos:
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            if inner_ds:
                func_name = f"fetch{to_type_name(inner_ds)}"
                if func_name not in api_funcs:
                    api_funcs.append(func_name)
        code_transactions = [s for s in scripts if s.get('name') == 'gfn_Code_Transaction']
        for code_txn in code_transactions:
            for entry in code_txn.get('codeArr', []):
                target_ds = entry.get('targetDataset', '')
                if target_ds:
                    clean_name = target_ds[3:] if target_ds.startswith('ds_') else target_ds
                    func_name = f"fetch{clean_name}"
                    if func_name not in api_funcs:
                        api_funcs.append(func_name)

    content += "import {\n"
    content += "  " + ",\n  ".join(sorted(api_funcs))
    content += f",\n}} from './api/{api_file_name}';\n"

    # Create row hook import
    if multi:
        create_funcs = sorted(set(gi['create_func'] for gi in grid_infos))
        content += f"import {{ {', '.join(create_funcs)} }} from './hooks/useCreateRows';\n"
    else:
        content += f"import {{ create{screen_name}Row }} from './hooks/useCreate{screen_name}Row';\n"

    # Grid columns hook import
    if multi:
        col_funcs = [gi['col_func'] for gi in grid_infos]
        content += "import {\n"
        for cf in col_funcs:
            content += f"  {cf},\n"
        content += "} from './hooks/useCreateGridColumns';\n"
    elif has_grid:
        content += "import {\n"
        content += f"  {header_tree_name},\n"
        content += f"  {grid_col_func},\n"
        content += "} from './hooks/useCreateGridColumn';\n"

    content += "import { useI18N } from '@/i18n/useI18N';\n"

    # Type imports
    type_imports = []
    if multi:
        type_imports.append(f"{screen_name}SearchParams")
        for gi in grid_infos:
            if gi['row_type'] not in type_imports:
                type_imports.append(gi['row_type'])
        all_option_types = set()
        for gi in grid_infos:
            for p in gi['combo_params']:
                all_option_types.add(p['type'])
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '').lstrip('@')
            if inner_ds:
                all_option_types.add(ds_id_to_option_type_name(inner_ds))
        for ot in sorted(all_option_types):
            if ot not in type_imports:
                type_imports.append(ot)
    else:
        if has_combos:
            type_imports.append(f"{screen_name}SearchParams")
        for ds in lookup_datasets:
            if ds['type'] not in type_imports:
                type_imports.append(ds['type'])

    if type_imports:
        content += "import type {\n"
        content += "  " + ",\n  ".join(type_imports)
        content += f",\n}} from './types/{screen_name}Types';\n"

    content += "import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';\n\n"

    if multi and has_tabs:
        content += "const TAB_REGISTER = 'register';\n"
        content += "const TAB_STATUS = 'status';\n"
    content += f"const PAGE_NAME = '{form_id}_PAGE';\n\n"

    content += f"export default function {page_name}() {{\n\n"
    content += "  const i18n = useI18N(PAGE_NAME);\n"

    if has_auth_check:
        content += "  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);\n"

    content += "\n"

    if has_tabs:
        if multi:
            content += "  const [activeTab, setActiveTab] = useState(TAB_REGISTER);\n\n"
        else:
            content += "  const [activeTab, setActiveTab] = useState('tab0');\n\n"

    # Option datasets state
    if multi:
        # Collect all option datasets (search combos + grid combos)
        option_ds_ids_ordered = []
        seen_option_ds = set()
        # From gfn_Code_Transaction codeArr
        code_transactions = [s for s in scripts if s.get('name') == 'gfn_Code_Transaction']
        for code_txn in code_transactions:
            for entry in code_txn.get('codeArr', []):
                target_ds = entry.get('targetDataset', '')
                if target_ds:
                    ds_id = f"ds_{target_ds}" if not target_ds.startswith('ds_') else target_ds
                    if ds_id not in seen_option_ds and ds_id not in grid_ds_ids:
                        option_ds_ids_ordered.append(ds_id)
                        seen_option_ds.add(ds_id)
        # From search combo innerdatasets
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '').lstrip('@')
            if inner_ds and inner_ds not in seen_option_ds and inner_ds not in grid_ds_ids:
                option_ds_ids_ordered.append(inner_ds)
                seen_option_ds.add(inner_ds)
        # From grid combo columns
        for grid in grids:
            for col in grid.get('columns', []):
                is_combo = col.get('edittype') in ('combo',) or col.get('displaytype') == 'combo'
                if is_combo:
                    combo_ds = col.get('combodataset', '')
                    if combo_ds and not combo_ds.startswith('g_') and combo_ds not in seen_option_ds and combo_ds not in grid_ds_ids:
                        option_ds_ids_ordered.append(combo_ds)
                        seen_option_ds.add(combo_ds)

        for ds_id in option_ds_ids_ordered:
            var_name = ds_id_to_option_var_name(ds_id)
            type_name = ds_id_to_option_type_name(ds_id)
            setter = var_name[0].upper() + var_name[1:]
            content += f"  const [{var_name}, set{setter}] = useState<{type_name}[]>([]);\n"
    else:
        for ds in lookup_datasets:
            setter = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
            content += f"  const [{ds['var']}, set{setter}] = useState<{ds['type']}[]>([]);\n"
    content += "\n"

    if has_combos:
        content += "  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});\n\n"

        content += "  const searchFields = useMemo<SearchConditionFieldConfig[]>(\n"
        content += "    () => [\n"
        for combo in search_combos:
            combo_id = combo.get('id', '')
            if multi:
                field_id = resolve_combo_search_field_name(combo, datasets)
            else:
                field_id = to_camel_case(combo_id)
            label = resolve_combo_label(combo, statics)
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            codecolumn = combo.get('codecolumn', 'COMM_CODE')
            namecolumn = combo.get('namecolumn', combo.get('datacolumn', 'CODE_KOR_NAME'))
            if multi:
                ds_var = ds_id_to_option_var_name(inner_ds) if inner_ds else to_camel_case(combo_id)
            else:
                ds_var = to_var_name(inner_ds) if inner_ds else to_camel_case(combo_id)
            content += "      {\n"
            content += f"        id: '{field_id}',\n"
            content += f"        label: '{label}',\n"
            content += "        type: 'combo',\n"
            content += f"        dataSource: {ds_var},\n"
            content += f"        dataPathToText: '{to_camel_case(namecolumn)}',\n"
            content += f"        dataPathToValue: '{to_camel_case(codecolumn)}',\n"
            content += "        required: false,\n"
            content += "      },\n"
        content += "    ],\n"
        combo_deps = []
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            if inner_ds:
                if multi:
                    ds_var = ds_id_to_option_var_name(inner_ds)
                else:
                    ds_var = to_var_name(inner_ds)
                if ds_var not in combo_deps:
                    combo_deps.append(ds_var)
        content += f"    [{', '.join(combo_deps)}],\n"
        content += "  );\n\n"

    if multi and option_ds_ids_ordered:
        # Identify code_transaction option ds_ids (auto-fetchable, no params needed)
        code_txn_ds_ids = set()
        for code_txn in code_transactions:
            for entry in code_txn.get('codeArr', []):
                target_ds = entry.get('targetDataset', '')
                if target_ds:
                    ds_id = f"ds_{target_ds}" if not target_ds.startswith('ds_') else target_ds
                    code_txn_ds_ids.add(ds_id)

        auto_fetch_ds = [ds_id for ds_id in option_ds_ids_ordered if ds_id in code_txn_ds_ids]
        if auto_fetch_ds:
            content += "  useEffect(() => {\n"
            content += "    const fetchData = async () => {\n"
            result_vars = []
            fetch_calls = []
            for ds_id in auto_fetch_ds:
                var_name = ds_id_to_option_var_name(ds_id)
                res_suffix = var_name[0].upper() + var_name[1:]
                result_vars.append(f"res{res_suffix}")
                clean = ds_id.replace('ds_', '') if ds_id.startswith('ds_') else ds_id
                fetch_calls.append(f"fetchDs{clean}Options()")
            content += f"      const [{', '.join(result_vars)}] = await Promise.all([\n"
            for call in fetch_calls:
                content += f"        {call},\n"
            content += "      ]);\n"
            for i, ds_id in enumerate(auto_fetch_ds):
                var_name = ds_id_to_option_var_name(ds_id)
                setter = var_name[0].upper() + var_name[1:]
                content += f"      set{setter}({result_vars[i]}.responseBody || []);\n"
            content += "    };\n\n"
            content += "    fetchData();\n"
            content += "  }, []);\n\n"

        # isSearchComboReady — 코멘트 처리 (mock 환경에서 빈 데이터 시 검색 필드 미표시 방지)
        if has_combos:
            auto_fetch_set = set(auto_fetch_ds) if auto_fetch_ds else set()
            combo_ready_checks = []
            for combo in search_combos:
                inner_ds = combo.get('innerdataset', '').lstrip('@')
                if inner_ds and inner_ds in auto_fetch_set:
                    ds_var = ds_id_to_option_var_name(inner_ds)
                    check = f"{ds_var}.length > 0"
                    if check not in combo_ready_checks:
                        combo_ready_checks.append(check)
            if combo_ready_checks:
                content += f"  // const isSearchComboReady = {' && '.join(combo_ready_checks)};\n\n"

    elif lookup_datasets:
        content += "  useEffect(() => {\n"
        content += "    const fetchData = async () => {\n"
        result_vars = []
        fetch_calls = []
        for ds in lookup_datasets:
            res_suffix = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
            result_vars.append(f"res{res_suffix}")
            fetch_calls.append(f"fetch{ds['type']}()")
        content += f"      const [{', '.join(result_vars)}] = await Promise.all([\n"
        for call in fetch_calls:
            content += f"        {call},\n"
        content += "      ]);\n\n"
        for i, ds in enumerate(lookup_datasets):
            setter = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
            content += f"      set{setter}({result_vars[i]}.responseBody || []);\n"
        content += "    };\n\n"
        content += "    fetchData();\n"
        content += "  }, []);\n\n"

        if has_combos:
            combo_ready_checks = []
            for combo in search_combos:
                inner_ds = combo.get('innerdataset', '').lstrip('@')
                if inner_ds:
                    ds_var = to_var_name(inner_ds)
                    check = f"{ds_var}.length > 0"
                    if check not in combo_ready_checks:
                        combo_ready_checks.append(check)
            if combo_ready_checks:
                content += f"  // const isSearchComboReady = {' && '.join(combo_ready_checks)};\n\n"

    # === 멀티 그리드 ===
    if multi:
        # useMemo for grid columns
        for gi in grid_infos:
            content += f"  const {gi['columns_var']} = useMemo(\n"
            content += f"    () =>\n"
            if gi['combo_params']:
                content += f"      {gi['col_func']}({{\n"
                for p in gi['combo_params']:
                    content += f"        {p['param']},\n"
                content += "      }),\n"
            else:
                content += f"      {gi['col_func']}(),\n"
            content += "    ["
            if gi['combo_params']:
                content += ", ".join([p['param'] for p in gi['combo_params']])
            content += "],\n"
            content += "  );\n\n"

        # useGrid for each grid
        for gi_idx, gi in enumerate(grid_infos):
            prefix = gi['handler_prefix']
            # Destructured handlers
            content += "  const {\n"
            content += f"    handleSearch: handleSearch{prefix},\n"
            content += f"    handleCreate: handleCreate{prefix},\n"
            if gi['has_save']:
                content += f"    handleCommit: handleCommit{prefix},\n"
                content += f"    handleDelete: handleDelete{prefix},\n"
            if gi_idx == 0:
                content += "    handleExcel,\n"
            content += f"    handleGridInitialized: handle{prefix}GridInitialized,\n"
            content += f"  }} = useGrid<{gi['row_type']}, {screen_name}SearchParams>(\n"
            content += f"    {gi['create_func']},\n"
            content += f"    {gi['fetch_func']},\n"
            if gi['has_save']:
                content += f"    {gi['save_func']},\n"
            else:
                content += "    async () => ({ result: 'true', message: 'noop' }),\n"
            content += "    {\n"
            content += f"      pageName: PAGE_NAME,\n"
            content += f"      gridName: '{gi['grid_name']}',\n"
            content += f"      columns: {gi['columns_var']},\n"
            if has_close_guard:
                content += "      enableCloseGuard: true,\n"
                if gi_idx == 0:
                    content += "      enableSearchGuard: true,\n"
            content += "    }\n"
            content += "  );\n\n"

        # handleSearchWithFilters
        if has_combos:
            search_deps = ", ".join([f"handleSearch{gi['handler_prefix']}" for gi in grid_infos])
            content += "  const handleSearchWithFilters = useCallback(() => {\n"
            content += f"    const params: {screen_name}SearchParams = {{\n"
            for combo in search_combos:
                if multi:
                    field_id = resolve_combo_search_field_name(combo, datasets)
                else:
                    field_id = to_camel_case(combo.get('id', ''))
                content += f"      {field_id}: typeof searchFilters.{field_id} === 'string' ? searchFilters.{field_id} : null,\n"
            content += "    };\n"
            # Only search the first (main) grid by default
            content += f"    handleSearch{grid_infos[0]['handler_prefix']}(params);\n"
            content += f"  }}, [{search_deps}, searchFilters]);\n\n"
        else:
            search_deps = ", ".join([f"handleSearch{gi['handler_prefix']}" for gi in grid_infos])
            content += "  const handleSearchAll = useCallback(() => {\n"
            content += f"    handleSearch{grid_infos[0]['handler_prefix']}();\n"
            content += f"  }}, [{search_deps}]);\n\n"

        # handleCommitAll
        save_grids = [gi for gi in grid_infos if gi['has_save']]
        if save_grids:
            commit_deps = ", ".join([f"handleCommit{gi['handler_prefix']}" for gi in save_grids])
            content += "  const handleCommitAll = useCallback(async () => {\n"
            for gi in save_grids:
                content += f"    await handleCommit{gi['handler_prefix']}();\n"
            content += f"  }}, [{commit_deps}]);\n\n"

        content += "  const commonButtonProps: CommonButtonsProps = {\n"
        content += f"    title: i18n.t('{screen_title}'),\n"
        if has_auth_check:
            content += "    can: pageCrudAuthCheck.can,\n"
        content += "    actions: {\n"
        content += f"      createCommand: handleCreate{grid_infos[0]['handler_prefix']},\n"
        content += f"      deleteCommand: handleDelete{grid_infos[0]['handler_prefix']},\n" if grid_infos[0]['has_save'] else ""
        content += f"      searchCommand: {'handleSearchWithFilters' if has_combos else 'handleSearchAll'},\n"
        content += f"      commitCommand: {'handleCommitAll' if save_grids else 'async () => ({})'},\n"
        content += "      excelCommand: handleExcel,\n"
        content += "    },\n"
        content += "  };\n\n"

    # === 단일 그리드 ===
    else:
        if has_grid:
            content += f"  const {grid_columns_name} = useMemo(() => (\n"
            if grid_combo_params:
                content += f"    {grid_col_func}({{\n"
                for p in grid_combo_params:
                    content += f"      {p['param']}: {p['param']},\n"
                content += "    })\n"
            else:
                content += f"    {grid_col_func}()\n"
            content += "  ), ["
            if grid_combo_params:
                content += ", ".join([p['param'] for p in grid_combo_params])
            content += "]);\n\n"

        content += "  const {\n"
        content += "    handleSearch,\n"
        content += "    handleCreate,\n"
        content += "    handleDelete,\n"
        content += "    handleCommit,\n"
        content += "    handleExcel,\n"
        content += "    handleGridInitialized: handleGridInitializedBase,\n"
        content += "  } = useGrid(\n"
        content += f"    create{screen_name}Row,\n"
        content += f"    {main_fetch_name},\n"
        content += f"    {main_save_name},\n"
        content += "    {\n"
        if has_grid:
            content += f"      columns: {grid_columns_name},\n"
        content += "      pageName: PAGE_NAME,\n"
        content += "      gridName: 'mainGrid',\n"
        if has_close_guard:
            content += "      enableCloseGuard: true,\n"
            content += "      enableSearchGuard: true,\n"
        content += "    },\n"
        content += "  );\n\n"

        if has_combos:
            content += "  const handleSearchWithFilters = useCallback(() => {\n"
            content += f"    const params: {screen_name}SearchParams = {{\n"
            for combo in search_combos:
                camel_id = to_camel_case(combo.get('id', ''))
                content += f"      {camel_id}: typeof searchFilters.{camel_id} === 'string' ? searchFilters.{camel_id} : null,\n"
            content += "    };\n"
            content += "    return handleSearch(params);\n"
            content += "  }, [handleSearch, searchFilters]);\n\n"

        if has_grid:
            content += "  const handleGridInitialized = useCallback((grid: FlexGrid) => {\n"
            content += "    handleGridInitializedBase(grid);\n"
            content += f"    attachHeaderTreeDrag(grid, {{\n"
            content += f"      tree: {header_tree_name},\n"
            content += f"    }});\n"
            content += "  }, [handleGridInitializedBase]);\n\n"

        content += "  const commonButtonProps: CommonButtonsProps = {\n"
        content += f"    title: i18n.t('{screen_title}'),\n"
        if has_auth_check:
            content += "    can: pageCrudAuthCheck.can,\n"
        content += "    actions: {\n"
        content += "      createCommand: handleCreate,\n"
        content += "      deleteCommand: handleDelete,\n"
        content += f"      searchCommand: {'handleSearchWithFilters' if has_combos else 'handleSearch'},\n"
        content += "      commitCommand: handleCommit,\n"
        content += "      excelCommand: handleExcel,\n"
        content += "    },\n"
        content += "  };\n\n"

    # === Return JSX ===
    content += "  return (\n"
    content += f"    <{view_name}\n"

    if has_combos:
        if multi:
            combo_ready_checks = []
            for combo in search_combos:
                inner_ds = combo.get('innerdataset', '').lstrip('@')
                if inner_ds:
                    ds_var = ds_id_to_option_var_name(inner_ds)
                    check = f"{ds_var}.length > 0"
                    if check not in combo_ready_checks:
                        combo_ready_checks.append(check)
        else:
            combo_ready_checks = []
            for combo in search_combos:
                inner_ds = combo.get('innerdataset', '').lstrip('@')
                if inner_ds:
                    ds_var = to_var_name(inner_ds)
                    check = f"{ds_var}.length > 0"
                    if check not in combo_ready_checks:
                        combo_ready_checks.append(check)

        if combo_ready_checks or True:
            content += "      searchSection={\n"
            content += "        <SearchConditionFields\n"
            content += "          fields={searchFields}\n"
            content += "          values={searchFilters}\n"
            content += "          onValuesChange={setSearchFilters}\n"
            content += "        />\n"
            content += "      }\n"

    if multi:
        content += "      t={i18n.t}\n"

    content += "      commonButtonsProps={commonButtonProps}\n"

    if has_tabs:
        content += "      activeTab={activeTab}\n"
        content += "      onTabChange={setActiveTab}\n"

    if multi:
        for gi in grid_infos:
            content += f"      {gi['prop_name']}={{handle{gi['handler_prefix']}GridInitialized}}\n"
    elif has_grid:
        content += "      onGridInitialized={handleGridInitialized}\n"

    content += "    />\n"
    content += "  );\n"
    content += "}\n"

    file_path = os.path.join(output_dir, f"{page_name}.tsx")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {page_name}.tsx")


def generate_view_and_page(screen_name=None):
    if screen_name is None:
        dirs = [d for d in os.listdir(TOBE_BASE_DIR) if os.path.isdir(os.path.join(TOBE_BASE_DIR, d))]
        if dirs:
            screen_name = dirs[0]
        else:
            print("Error: No screen folder found")
            return

    folder_name = to_camel_case(screen_name) if '_' in screen_name else screen_name.lower()
    camel_name = to_camel_case(screen_name) if '_' in screen_name else screen_name
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]

    output_dir = os.path.join(TOBE_BASE_DIR, folder_name)
    meta_path = os.path.join(output_dir, f"{component_name}.META.json")

    if not os.path.exists(meta_path):
        print(f"Error: META.json not found at {meta_path}")
        return

    with open(meta_path, 'r', encoding='utf-8') as f:
        meta_data = json.load(f)

    print(f"\n{'='*60}")
    print(f"Generating View/Page for: {folder_name} (component: {component_name})")
    print(f"Output directory: {output_dir}")
    print(f"{'='*60}\n")

    view_name = generate_view(meta_data, output_dir, component_name)
    generate_page(meta_data, output_dir, component_name, view_name, camel_name)

    print(f"\n{'='*60}")
    print(f"Generation complete!")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    generate_view_and_page(screen_name)
