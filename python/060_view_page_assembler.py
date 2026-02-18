import os
import sys
import json
import re

# Configuration (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(text):
    """Convert string to PascalCase
    BAD_CODE_REGISTER -> BadCodeRegister
    """
    if not text:
        return ""
    words = text.split('_')
    return ''.join(word.capitalize() for word in words)


def to_camel_case(text):
    """Convert string to camelCase"""
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
    """Dataset ID를 변수명으로 변환 (ds 접두사 유지, 원본 대소문자 유지)
    ds_SearchListResult535_Row -> dsSearchListResult535Row
    ds_combo1 -> dsCombo1
    """
    tn = to_type_name(ds_id)
    return tn[0].lower() + tn[1:] if tn else ''


def extract_dataset_id(ds_mapping):
    """A=B 형태에서 A(Dataset ID) 추출"""
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


def get_grid_titles(meta_data):
    """각 그리드의 제목 추출 (sub_title Static 위치 매칭)"""
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


def get_lookup_datasets(meta_data):
    """조회조건/콤보에 사용되는 Dataset 목록 반환 (그리드 데이터셋 제외)"""
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
    """콤보 라벨 결정 헬퍼
    1. combo에 label이 있으면 사용
    2. Statics에서 cell_title cssclass를 가진 항목 중 위치가 가까운 것 매칭
    3. fallback: combo id
    """
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
    """위치 문자열을 숫자로 변환"""
    try:
        return int(val)
    except (ValueError, TypeError):
        return 0


def assign_grids_to_splitter_panels(grids, splitter):
    """스플리터 위치 기준으로 그리드를 좌/우(또는 상/하) 패널에 할당

    Returns: (panel1_indices, panel2_indices, unassigned_indices)
    panel1 = left or top, panel2 = right or bottom
    """
    orientation = splitter.get('orientation', 'vertical')
    if orientation == 'vertical':
        splitter_pos = _parse_position(splitter.get('left', '0'))
        pos_key = 'left'
    else:
        splitter_pos = _parse_position(splitter.get('top', '0'))
        pos_key = 'top'

    panel1 = []   # left or top
    panel2 = []   # right or bottom
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
    """Statics에서 화면 제목 가져오기
    우선순위: Form titletext → title cssclass → sub_title cssclass → fallback
    """
    # 1. Form titletext (가장 정확한 화면 제목)
    form = meta_data.get('Form', {})
    if form.get('titletext', ''):
        return form['titletext']

    statics = meta_data.get('Statics', [])

    # 2. 'title' cssclass를 가진 Static
    for s in statics:
        cssclass = s.get('cssclass', '')
        if cssclass == 'title' and s.get('text', ''):
            return s['text']

    # 3. 'sub_title' cssclass를 가진 Static
    for s in statics:
        cssclass = s.get('cssclass', '')
        if cssclass == 'sub_title' and s.get('text', ''):
            return s['text']

    return '화면제목'


def generate_view(meta_data, output_dir, screen_name):
    """Generate {ScreenName}View.tsx - v2.0 ViewFill + CommonButtons 패턴

    - wjInput 제거
    - ViewFill/CommonButtons 레이아웃
    - 표준 Props (t, gridHeaderDefinition, searchSection, handlers)
    - Static/ComboBox/절대좌표/개별버튼 모두 제거
    - 스플리터 지원 (div flex 레이아웃)
    """
    view_name = f"{screen_name}View"
    grids = meta_data.get('Grids', [])
    splitters = meta_data.get('Splitters', [])
    tabs = meta_data.get('Tabs', [])
    has_grid = len(grids) > 0
    is_multi_grid = len(grids) > 1
    has_splitter = len(splitters) > 0
    has_tabs = len(tabs) > 0 and len(tabs[0].get('tabpages', [])) > 1
    tab_pages = tabs[0].get('tabpages', []) if has_tabs else []
    screen_title = get_screen_title(meta_data)
    grid_titles = get_grid_titles(meta_data) if is_multi_grid else []

    # 스플리터 패널 할당
    splitter_panel1 = []
    splitter_panel2 = []
    splitter_unassigned = []
    if has_splitter and is_multi_grid:
        splitter_panel1, splitter_panel2, splitter_unassigned = assign_grids_to_splitter_panels(grids, splitters[0])

    # 탭이 있으면 모든 그리드 포함, 없으면 스플리터 할당 기준
    if has_tabs:
        assigned_grid_indices = list(range(len(grids)))
    elif has_splitter and is_multi_grid:
        assigned_grid_indices = splitter_panel1 + splitter_panel2
    else:
        assigned_grid_indices = list(range(len(grids)))

    # === Import Section ===
    content = ""
    if has_grid:
        content += "import * as wjGrid from '@mescius/wijmo.react.grid';\n"
        content += "import type { FlexGrid } from '@mescius/wijmo.grid';\n"
        content += "\n"

    # 스플리터 또는 탭: React hooks 필요
    needs_react_hooks = (has_splitter and is_multi_grid) or has_tabs
    if needs_react_hooks:
        content += "import { useState, useCallback, useRef } from 'react';\n"

    content += "import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';\n"
    content += "import { ViewFill } from '@/components/layout/ViewFill';\n"
    content += "import CommonButtons from '@/components/common-control/CommonButtons';\n"

    # === Props Type ===
    content += f"\nexport type {view_name}Props = {{\n"
    content += "  commonButtonsProps: CommonButtonsProps;\n"
    content += "  searchSection?: React.ReactNode;\n"

    # 스플리터가 있으면 각 패널의 children을 위한 props 추가
    # (단, 멀티그리드인 경우 FlexGrid를 직접 렌더링하므로 패널 content props 불필요)
    if has_splitter and not is_multi_grid:
        for i, splitter in enumerate(splitters):
            orientation = splitter.get('orientation', 'vertical')
            if orientation == 'vertical':
                content += f"  leftPanelContent?: React.ReactNode;\n"
                content += f"  rightPanelContent?: React.ReactNode;\n"
            else:
                content += f"  topPanelContent?: React.ReactNode;\n"
                content += f"  bottomPanelContent?: React.ReactNode;\n"

    if is_multi_grid:
        for i in assigned_grid_indices:
            idx = i + 1
            content += f"  onGrid{idx}Initialized: (grid: FlexGrid) => void;\n"
    elif has_grid:
        content += "  onGridInitialized: (grid: FlexGrid) => void;\n"

    content += "};\n"

    # === Component ===
    content += f"\nconst {view_name} = (props: {view_name}Props) => {{\n"
    content += "  const {\n"
    content += "    commonButtonsProps,\n"
    content += "    searchSection,\n"
    if has_splitter and not is_multi_grid:
        for i, splitter in enumerate(splitters):
            orientation = splitter.get('orientation', 'vertical')
            if orientation == 'vertical':
                content += "    leftPanelContent,\n"
                content += "    rightPanelContent,\n"
            else:
                content += "    topPanelContent,\n"
                content += "    bottomPanelContent,\n"
    if is_multi_grid:
        for i in assigned_grid_indices:
            idx = i + 1
            content += f"    onGrid{idx}Initialized,\n"
    elif has_grid:
        content += "    onGridInitialized,\n"
    content += "  } = props;\n"

    # === 탭 state ===
    if has_tabs:
        content += "\n  const [activeTab, setActiveTab] = useState(0);\n"

    # === 스플리터 state/handler (멀티그리드일 때만) ===
    if has_splitter and is_multi_grid:
        splitter = splitters[0]
        orientation = splitter.get('orientation', 'vertical')
        form_data = meta_data.get('Form', {})
        if orientation == 'vertical':
            splitter_pos = _parse_position(splitter.get('left', '0'))
            form_size = _parse_position(form_data.get('width', '1000'))
        else:
            splitter_pos = _parse_position(splitter.get('top', '0'))
            form_size = _parse_position(form_data.get('height', '500'))
        initial_pct = round((splitter_pos / form_size) * 100) if form_size > 0 else 50
        initial_pct = max(10, min(90, initial_pct))

        if orientation == 'vertical':
            content += f"\n  const [leftWidth, setLeftWidth] = useState({initial_pct});\n"
            content += "  const containerRef = useRef<HTMLDivElement>(null);\n\n"
            content += "  const handleSplitterMouseDown = useCallback((e: React.MouseEvent) => {\n"
            content += "    e.preventDefault();\n"
            content += "    const container = containerRef.current;\n"
            content += "    if (!container) return;\n"
            content += "    const onMouseMove = (ev: MouseEvent) => {\n"
            content += "      const rect = container.getBoundingClientRect();\n"
            content += "      const pct = ((ev.clientX - rect.left) / rect.width) * 100;\n"
            content += "      setLeftWidth(Math.min(Math.max(pct, 10), 90));\n"
            content += "    };\n"
            content += "    const onMouseUp = () => {\n"
            content += "      document.removeEventListener('mousemove', onMouseMove);\n"
            content += "      document.removeEventListener('mouseup', onMouseUp);\n"
            content += "    };\n"
            content += "    document.addEventListener('mousemove', onMouseMove);\n"
            content += "    document.addEventListener('mouseup', onMouseUp);\n"
            content += "  }, []);\n"
        else:
            content += f"\n  const [topHeight, setTopHeight] = useState({initial_pct});\n"
            content += "  const containerRef = useRef<HTMLDivElement>(null);\n\n"
            content += "  const handleSplitterMouseDown = useCallback((e: React.MouseEvent) => {\n"
            content += "    e.preventDefault();\n"
            content += "    const container = containerRef.current;\n"
            content += "    if (!container) return;\n"
            content += "    const onMouseMove = (ev: MouseEvent) => {\n"
            content += "      const rect = container.getBoundingClientRect();\n"
            content += "      const pct = ((ev.clientY - rect.top) / rect.height) * 100;\n"
            content += "      setTopHeight(Math.min(Math.max(pct, 10), 90));\n"
            content += "    };\n"
            content += "    const onMouseUp = () => {\n"
            content += "      document.removeEventListener('mousemove', onMouseMove);\n"
            content += "      document.removeEventListener('mouseup', onMouseUp);\n"
            content += "    };\n"
            content += "    document.addEventListener('mousemove', onMouseMove);\n"
            content += "    document.addEventListener('mouseup', onMouseUp);\n"
            content += "  }, []);\n"

    # === JSX Return ===
    content += "\n  return (\n"
    content += "    <ViewFill variant=\"root\">\n"

    # CommonButtons
    content += "      <CommonButtons {...commonButtonsProps} />\n"

    # Search section header
    content += "      <header className=\"shrink-0\">\n"
    content += "        {searchSection}\n"
    content += "      </header>\n"

    # 탭이 있는 화면: 탭 버튼 + 조건부 컨텐츠 렌더링
    if has_tabs:
        content += "      <ViewFill>\n"
        # 탭 버튼
        content += "        <div className=\"flex border-b border-gray-300\">\n"
        for tab_idx, tab_page in enumerate(tab_pages):
            tab_text = tab_page.get('text', f'Tab {tab_idx + 1}')
            content += f"          <button\n"
            content += f"            className={{`px-4 py-2 text-sm font-medium ${{activeTab === {tab_idx} ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}}`}}\n"
            content += f"            onClick={{() => setActiveTab({tab_idx})}}\n"
            content += f"          >\n"
            content += f"            {tab_text}\n"
            content += f"          </button>\n"
        content += "        </div>\n"
        # Tab 0: 스플리터가 있으면 스플리터 레이아웃
        if has_splitter and is_multi_grid and splitter_panel1:
            content += "        {activeTab === 0 && (\n"
            splitter = splitters[0]
            orientation = splitter.get('orientation', 'vertical')
            if orientation == 'vertical':
                content += "          <div ref={containerRef} className=\"flex flex-1 min-h-0\">\n"
                content += "            <div style={{ width: `${leftWidth}%` }} className=\"min-w-0 overflow-hidden\">\n"
                for gi in splitter_panel1:
                    idx = gi + 1
                    content += f"              <wjGrid.FlexGrid\n"
                    content += f"                autoGenerateColumns={{false}}\n"
                    content += f"                initialized={{onGrid{idx}Initialized}}\n"
                    content += f"                style={{{{ height: '100%' }}}}\n"
                    content += f"              />\n"
                content += "            </div>\n"
                content += "            <div\n"
                content += "              className=\"w-2 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors\"\n"
                content += "              onMouseDown={handleSplitterMouseDown}\n"
                content += "            />\n"
                content += "            <div className=\"flex-1 min-w-0 overflow-hidden\">\n"
                for gi in splitter_panel2:
                    idx = gi + 1
                    content += f"              <wjGrid.FlexGrid\n"
                    content += f"                autoGenerateColumns={{false}}\n"
                    content += f"                initialized={{onGrid{idx}Initialized}}\n"
                    content += f"                style={{{{ height: '100%' }}}}\n"
                    content += f"              />\n"
                content += "            </div>\n"
                content += "          </div>\n"
            content += "        )}\n"
        else:
            # Tab 0에 스플리터 없음 - 그리드 직접 렌더링
            tab0_grids = splitter_panel1 + splitter_panel2 if (splitter_panel1 or splitter_panel2) else list(range(min(1, len(grids))))
            if tab0_grids:
                content += "        {activeTab === 0 && (\n"
                content += "          <div className=\"flex-1 min-h-0\">\n"
                for gi in tab0_grids:
                    idx = gi + 1
                    content += f"            <wjGrid.FlexGrid\n"
                    content += f"              autoGenerateColumns={{false}}\n"
                    content += f"              initialized={{onGrid{idx}Initialized}}\n"
                    content += f"              style={{{{ height: '100%' }}}}\n"
                    content += f"            />\n"
                content += "          </div>\n"
                content += "        )}\n"
        # Tab 1+: unassigned 그리드
        for tab_idx in range(1, len(tab_pages)):
            if tab_idx == 1 and splitter_unassigned:
                content += f"        {{activeTab === {tab_idx} && (\n"
                content += "          <div className=\"flex-1 min-h-0\">\n"
                for gi in splitter_unassigned:
                    idx = gi + 1
                    content += f"            <wjGrid.FlexGrid\n"
                    content += f"              autoGenerateColumns={{false}}\n"
                    content += f"              initialized={{onGrid{idx}Initialized}}\n"
                    content += f"              style={{{{ height: '100%' }}}}\n"
                    content += f"            />\n"
                content += "          </div>\n"
                content += "        )}\n"
        content += "      </ViewFill>\n"
    # 스플리터 + 멀티그리드 (탭 없음): FlexGrid를 패널에 직접 렌더링 + 드래그 핸들
    elif has_splitter and is_multi_grid:
        splitter = splitters[0]
        orientation = splitter.get('orientation', 'vertical')
        panel1, panel2, _ = assign_grids_to_splitter_panels(grids, splitter)

        content += "      <ViewFill>\n"

        if orientation == 'vertical':
            content += "        <div ref={containerRef} className=\"flex h-full\">\n"
            # Left panel (percentage width)
            content += "          <div style={{ width: `${leftWidth}%` }} className=\"min-w-0 overflow-hidden\">\n"
            for gi in panel1:
                idx = gi + 1
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{onGrid{idx}Initialized}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            content += "          </div>\n"
            # Splitter handle
            content += "          <div\n"
            content += "            className=\"w-2 flex-shrink-0 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors\"\n"
            content += "            onMouseDown={handleSplitterMouseDown}\n"
            content += "          />\n"
            # Right panel (flex-1)
            content += "          <div className=\"flex-1 min-w-0 overflow-hidden\">\n"
            for gi in panel2:
                idx = gi + 1
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{onGrid{idx}Initialized}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            content += "          </div>\n"
            content += "        </div>\n"
        else:
            content += "        <div ref={containerRef} className=\"flex flex-col h-full\">\n"
            # Top panel (percentage height)
            content += "          <div style={{ height: `${topHeight}%` }} className=\"min-h-0 overflow-hidden\">\n"
            for gi in panel1:
                idx = gi + 1
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{onGrid{idx}Initialized}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            content += "          </div>\n"
            # Splitter handle
            content += "          <div\n"
            content += "            className=\"h-2 flex-shrink-0 cursor-row-resize bg-gray-300 hover:bg-blue-400 transition-colors\"\n"
            content += "            onMouseDown={handleSplitterMouseDown}\n"
            content += "          />\n"
            # Bottom panel (flex-1)
            content += "          <div className=\"flex-1 min-h-0 overflow-hidden\">\n"
            for gi in panel2:
                idx = gi + 1
                content += f"            <wjGrid.FlexGrid\n"
                content += f"              autoGenerateColumns={{false}}\n"
                content += f"              initialized={{onGrid{idx}Initialized}}\n"
                content += f"              style={{{{ height: '100%' }}}}\n"
                content += f"            />\n"
            content += "          </div>\n"
            content += "        </div>\n"

        content += "      </ViewFill>\n"
    # 스플리터만 있고 그리드 1개 이하: pass-through content
    elif has_splitter:
        splitter = splitters[0]
        orientation = splitter.get('orientation', 'vertical')

        content += "      <ViewFill>\n"

        if orientation == 'vertical':
            content += "        <div className=\"flex h-full\">\n"
            content += "          <div className=\"flex-1 min-w-0\">\n"
            content += "            {leftPanelContent}\n"
            content += "          </div>\n"
            content += "          <div className=\"flex-1 min-w-0\">\n"
            content += "            {rightPanelContent}\n"
            content += "          </div>\n"
            content += "        </div>\n"
        else:
            content += "        <div className=\"flex flex-col h-full\">\n"
            content += "          <div className=\"flex-1 min-h-0\">\n"
            content += "            {topPanelContent}\n"
            content += "          </div>\n"
            content += "          <div className=\"flex-1 min-h-0\">\n"
            content += "            {bottomPanelContent}\n"
            content += "          </div>\n"
            content += "        </div>\n"

        content += "      </ViewFill>\n"
    # 멀티 그리드 (스플리터 없음): 그리드 위치 기반 레이아웃
    elif is_multi_grid:
        # 그리드 left 위치로 레이아웃 방향 결정 (모두 같은 left면 세로, 다르면 가로)
        grid_lefts = [_parse_position(g.get('left', '0')) for g in grids]
        is_vertical_layout = (max(grid_lefts) - min(grid_lefts)) < 50 if grid_lefts else False

        if is_vertical_layout:
            content += "      <div className=\"flex flex-col gap-2\" style={{ flex: 1, minHeight: 0 }}>\n"
        else:
            content += "      <div className=\"flex h-full gap-4\" style={{ flex: 1, minHeight: 0 }}>\n"
        for i, grid in enumerate(grids):
            idx = i + 1
            title = grid_titles[i] if i < len(grid_titles) else None
            content += f"        <ViewFill>\n"
            if title:
                content += f"          <div className=\"text-sm font-medium py-1\">{title}</div>\n"
            content += f"          <wjGrid.FlexGrid\n"
            content += f"            autoGenerateColumns={{false}}\n"
            content += f"            initialized={{onGrid{idx}Initialized}}\n"
            content += f"            style={{{{ height: '100%' }}}}\n"
            content += f"          />\n"
            content += f"        </ViewFill>\n"
        content += "      </div>\n"
    # 스플리터 없이 Grid 1개인 경우
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

    file_path = os.path.join(output_dir, f"{view_name}.tsx")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {view_name}.tsx")

    return view_name


def generate_page(meta_data, output_dir, screen_name, view_name, camel_name=None):
    """Generate {ScreenName}Page.tsx - v2.1

    - useGrid 공통 훅 (옵션 객체: columns, pageName, gridName, enableCloseGuard, enableSearchGuard)
    - usePageCrudAuth 조건부 권한 체크
    - CommonButtonsProps 조립
    - SearchConditionFields 선언적 조회조건
    - HeaderTree 드래그
    - useI18N 다국어
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
    has_grid = len(grids) > 0
    is_multi_grid = len(grids) > 1
    splitters = meta_data.get('Splitters', [])
    has_splitter = len(splitters) > 0
    # innerdataset이 있는 콤보만 조회조건으로 사용 (innerdataset 없는 콤보는 skip)
    search_combos = [c for c in combos if c.get('innerdataset', '').lstrip('@')]
    has_combos = len(search_combos) > 0

    tabs = meta_data.get('Tabs', [])
    has_tabs = len(tabs) > 0 and len(tabs[0].get('tabpages', [])) > 1

    # 탭이 있으면 모든 그리드 포함, 없으면 스플리터 할당 기준
    if has_tabs:
        assigned_grid_indices = set(range(len(grids)))
    elif has_splitter and is_multi_grid:
        panel1, panel2, _ = assign_grids_to_splitter_panels(grids, splitters[0])
        assigned_grid_indices = set(panel1 + panel2)
    else:
        assigned_grid_indices = set(range(len(grids)))

    # 상수명
    form_id_upper = form_id.upper().replace(' ', '_')
    header_tree_name = f"{form_id_upper}_HEADER_TREE"
    grid_columns_name = f"{form_id_upper}_COLUMNS"

    # 멀티 그리드 정보 준비 (할당된 그리드만)
    grid_infos = []
    if is_multi_grid:
        for i, grid in enumerate(grids):
            if i not in assigned_grid_indices:
                continue
            idx = i + 1
            grid_id = grid.get('id', f'datagrid{idx}')
            col_func = f"create{to_pascal_case(grid_id)}ColumnDefinition"
            columns_name = f"{form_id_upper}_COLUMNS_{idx}"
            fetch_func = f"fetch{screen_name}s" if i == 0 else f"fetch{screen_name}{to_pascal_case(grid_id)}"
            # 그리드별 combo params
            combo_params = []
            for col in grid.get('columns', []):
                if col.get('edittype') == 'combo':
                    combo_ds = col.get('combodataset', '')
                    if combo_ds and not combo_ds.startswith('g_'):
                        param_name = to_var_name(combo_ds)
                        if param_name not in [p['param'] for p in combo_params]:
                            type_name = to_type_name(combo_ds)
                            combo_params.append({'param': param_name, 'type': type_name})
            grid_infos.append({
                'idx': idx,
                'grid_id': grid_id,
                'col_func': col_func,
                'columns_name': columns_name,
                'fetch_func': fetch_func,
                'combo_params': combo_params,
            })

    # Grid column definition 함수명 (단일 그리드용)
    grid_col_func = ""
    if has_grid and not is_multi_grid:
        grid_id = grids[0].get('id', 'datagrid1')
        grid_col_func = f"create{to_pascal_case(grid_id)}ColumnDefinition"

    # 그리드에 사용되는 combo datasets (for useMemo params, 단일 그리드용)
    grid_combo_params = []
    if has_grid and not is_multi_grid:
        for col in grids[0].get('columns', []):
            if col.get('edittype') == 'combo':
                combo_ds = col.get('combodataset', '')
                if combo_ds and not combo_ds.startswith('g_'):
                    param_name = to_var_name(combo_ds)
                    if param_name not in [p['param'] for p in grid_combo_params]:
                        type_name = to_type_name(combo_ds)
                        grid_combo_params.append({'param': param_name, 'type': type_name})

    # hasAuthCheck / hasCloseGuard from META
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

    content += "import { attachHeaderTreeDrag } from '@/components/ap-wijmo/grid/HeaderTreeDrag';\n"
    content += "\n"

    # API imports
    api_funcs = [f"fetch{screen_name}s", f"save{screen_name}s"]
    # 멀티 그리드: 추가 그리드 fetch 함수
    if is_multi_grid:
        for gi in grid_infos[1:]:
            if gi['fetch_func'] not in api_funcs:
                api_funcs.append(gi['fetch_func'])
    for ds in lookup_datasets:
        func_name = f"fetch{ds['type']}"
        if func_name not in api_funcs:
            api_funcs.append(func_name)
    # 조회조건 combo의 dataset에 대한 fetch도 추가
    for combo in combos:
        inner_ds = combo.get('innerdataset', '')
        if inner_ds.startswith('@'):
            inner_ds = inner_ds[1:]
        if inner_ds:
            func_name = f"fetch{to_type_name(inner_ds)}"
            if func_name not in api_funcs:
                api_funcs.append(func_name)

    content += "import {\n"
    content += "  " + ",\n  ".join(api_funcs)
    content += f",\n}} from './api/{api_file_name}';\n"

    content += f"import {{ create{screen_name}Row }} from './hooks/useCreate{screen_name}Row';\n"

    if is_multi_grid:
        content += "import {\n"
        content += f"  {header_tree_name},\n"
        for gi in grid_infos:
            content += f"  {gi['col_func']},\n"
        content += "} from './hooks/useCreateGridColumn';\n"
    elif has_grid:
        content += "import {\n"
        content += f"  {header_tree_name},\n"
        content += f"  {grid_col_func},\n"
        content += "} from './hooks/useCreateGridColumn';\n"

    content += "\n"

    # Type imports
    type_imports = [f"{screen_name}Row"]
    if has_combos:
        type_imports.append(f"{screen_name}SearchParams")
    for ds in lookup_datasets:
        type_imports.append(ds['type'])

    content += "import type {\n"
    content += "  " + ",\n  ".join(type_imports)
    content += f",\n}} from './types/{screen_name}Types';\n"

    content += "import type { CommonButtonsProps } from '@/components/common-control/types/commonControlTypes';\n"
    content += "import { useI18N } from '@/i18n/useI18N';\n"
    content += "\n"

    # === PAGE_NAME constant ===
    content += f"const PAGE_NAME = '{form_id}_PAGE';\n\n"

    # === Component ===
    content += f"export default function {page_name}() {{\n"
    content += "\n"
    content += "  const i18n = useI18N(PAGE_NAME);\n"

    if has_auth_check:
        content += "  const pageCrudAuthCheck = usePageCrudAuth(PAGE_NAME);\n"

    content += "\n"

    # 보조 Dataset useState (grid data state 제거!)
    for ds in lookup_datasets:
        setter = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
        content += f"  const [{ds['var']}, set{setter}] = useState<{ds['type']}[]>([]);\n"
    content += "\n"

    # 조회조건 필터 상태
    if has_combos:
        content += "  const [searchFilters, setSearchFilters] = useState<SearchConditionValues>({});\n"
        content += "\n"

        # searchFields useMemo (Combos 기반)
        content += "  const searchFields = useMemo<SearchConditionFieldConfig[]>(\n"
        content += "    () => [\n"

        for combo in search_combos:
            combo_id = combo.get('id', '')
            camel_id = to_camel_case(combo_id)
            label = resolve_combo_label(combo, statics)
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]

            codecolumn = combo.get('codecolumn', 'COMM_CODE')
            namecolumn = combo.get('namecolumn', combo.get('datacolumn', 'CODE_KOR_NAME'))

            # 어떤 state 변수를 사용할지 결정
            ds_var = to_var_name(inner_ds) if inner_ds else camel_id

            content += "      {\n"
            content += f"        id: '{camel_id}',\n"
            content += f"        label: '{label}',\n"
            content += "        type: 'combo',\n"
            content += f"        dataSource: {ds_var},\n"
            content += f"        dataPathToText: '{to_camel_case(namecolumn)}',\n"
            content += f"        dataPathToValue: '{to_camel_case(codecolumn)}',\n"
            content += "        required: false,\n"
            content += "      },\n"

        content += "    ],\n"

        # useMemo deps: combo에 사용되는 데이터셋 변수들
        combo_deps = []
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            if inner_ds:
                ds_var = to_var_name(inner_ds)
                if ds_var not in combo_deps:
                    combo_deps.append(ds_var)
        content += f"    [{', '.join(combo_deps)}],\n"
        content += "  );\n\n"

    # useEffect + Promise.all (보조 데이터 로드)
    if lookup_datasets:
        content += "  useEffect(() => {\n"
        content += "    const fetchData = async () => {\n"

        # Promise.all 호출
        result_vars = []
        fetch_calls = []
        for ds in lookup_datasets:
            res_suffix = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
            var_name = f"res{res_suffix}"
            result_vars.append(var_name)
            fetch_calls.append(f"fetch{ds['type']}()")

        content += f"      const [{', '.join(result_vars)}] = await Promise.all([\n"
        for call in fetch_calls:
            content += f"        {call},\n"
        content += "      ]);\n\n"

        # 상태 업데이트
        for i, ds in enumerate(lookup_datasets):
            var_name = result_vars[i]
            setter = ds['var'][0].upper() + ds['var'][1:] if ds['var'] else ''
            content += f"      set{setter}({var_name}.responseBody || []);\n"

        content += "    };\n\n"
        content += "    fetchData();\n"
        content += "  }, []);\n\n"

    # isSearchComboReady
    if has_combos and lookup_datasets:
        # 조회조건에 사용되는 combo의 데이터셋이 로드되었는지 확인
        combo_ready_checks = []
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            if inner_ds:
                ds_var = to_var_name(inner_ds)
                check = f"{ds_var}.length > 0"
                if check not in combo_ready_checks:
                    combo_ready_checks.append(check)

        if combo_ready_checks:
            content += f"  const isSearchComboReady = {' && '.join(combo_ready_checks)};\n\n"

    # === 멀티 그리드 경로 ===
    if is_multi_grid:
        # GRID_COLUMNS useMemo (각 그리드별)
        for gi in grid_infos:
            content += f"  const {gi['columns_name']} = useMemo(() => (\n"
            if gi['combo_params']:
                content += f"    {gi['col_func']}({{\n"
                for p in gi['combo_params']:
                    content += f"      {p['param']}: {p['param']},\n"
                content += "    })\n"
            else:
                content += f"    {gi['col_func']}()\n"
            content += "  ), ["
            if gi['combo_params']:
                content += ", ".join([p['param'] for p in gi['combo_params']])
            content += "]);\n\n"

        # useGrid (각 그리드별)
        for gi in grid_infos:
            idx = gi['idx']
            content += f"  const {{\n"
            content += f"    handleSearch: handleSearch{idx},\n"
            content += f"    handleCreate: handleCreate{idx},\n"
            content += f"    handleDelete: handleDelete{idx},\n"
            content += f"    handleCommit: handleCommit{idx},\n"
            content += f"    handleExcel: handleExcel{idx},\n"
            content += f"    handleGridInitialized: handleGrid{idx}InitBase,\n"
            content += f"  }} = useGrid(\n"
            content += f"    create{screen_name}Row,\n"
            content += f"    {gi['fetch_func']},\n"
            content += f"    save{screen_name}s,\n"
            content += f"    {{\n"
            content += f"      columns: {gi['columns_name']},\n"
            content += f"      pageName: PAGE_NAME,\n"
            content += f"      gridName: 'grid{idx}',\n"
            if has_close_guard:
                content += f"      enableCloseGuard: true,\n"
                content += f"      enableSearchGuard: true,\n"
            content += f"    }},\n"
            content += f"  );\n\n"

        # handleSearchWithFilters (모든 그리드 검색)
        if has_combos:
            search_deps = ", ".join([f"handleSearch{gi['idx']}" for gi in grid_infos])
            content += "  const handleSearchWithFilters = useCallback(() => {\n"
            content += f"    const params: {screen_name}SearchParams = {{\n"
            for combo in search_combos:
                combo_id = combo.get('id', '')
                camel_id = to_camel_case(combo_id)
                content += f"      {camel_id}: typeof searchFilters.{camel_id} === 'string' ? searchFilters.{camel_id} : null,\n"
            content += "    };\n"
            for gi in grid_infos:
                content += f"    handleSearch{gi['idx']}(params);\n"
            content += f"  }}, [{search_deps}, searchFilters]);\n\n"
        else:
            search_deps = ", ".join([f"handleSearch{gi['idx']}" for gi in grid_infos])
            content += "  const handleSearchAll = useCallback(() => {\n"
            for gi in grid_infos:
                content += f"    handleSearch{gi['idx']}();\n"
            content += f"  }}, [{search_deps}]);\n\n"

        # handleCommitAll (모든 그리드 저장)
        commit_deps = ", ".join([f"handleCommit{gi['idx']}" for gi in grid_infos])
        content += "  const handleCommitAll = useCallback(async () => {\n"
        for gi in grid_infos:
            content += f"    await handleCommit{gi['idx']}();\n"
        content += f"  }}, [{commit_deps}]);\n\n"

        # handleGridInitialized (각 그리드별)
        for gi in grid_infos:
            idx = gi['idx']
            content += f"  const handleGrid{idx}Initialized = useCallback((grid: FlexGrid) => {{\n"
            content += f"    handleGrid{idx}InitBase(grid);\n"
            content += f"    attachHeaderTreeDrag(grid, {{\n"
            content += f"      tree: {header_tree_name},\n"
            content += f"    }});\n"
            content += f"  }}, [handleGrid{idx}InitBase]);\n\n"

        # CommonButtonsProps (grid1의 create/delete + combined search/commit)
        content += "  const commonButtonProps: CommonButtonsProps = {\n"
        content += f"    title: i18n.t('{screen_title}'),\n"
        if has_auth_check:
            content += "    can: pageCrudAuthCheck.can,\n"
        content += "    actions: {\n"
        content += "      createCommand: handleCreate1,\n"
        content += "      deleteCommand: handleDelete1,\n"
        if has_combos:
            content += "      searchCommand: handleSearchWithFilters,\n"
        else:
            content += "      searchCommand: handleSearchAll,\n"
        content += "      commitCommand: handleCommitAll,\n"
        content += "      excelCommand: handleExcel1,\n"
        content += "    },\n"
        content += "  };\n\n"

    # === 단일 그리드 경로 ===
    else:
        # GRID_COLUMNS useMemo
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

        # useGrid hook (with options 4th arg)
        content += "  const {\n"
        content += "    handleSearch,\n"
        content += "    handleCreate,\n"
        content += "    handleDelete,\n"
        content += "    handleCommit,\n"
        content += "    handleExcel,\n"
        content += "    handleGridInitialized: handleGridInitializedBase,\n"
        content += "  } = useGrid(\n"
        content += f"    create{screen_name}Row,\n"
        content += f"    fetch{screen_name}s,\n"
        content += f"    save{screen_name}s,\n"

        # 4번째 인자: 옵션 객체
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

        # handleSearchWithFilters
        if has_combos:
            content += "  const handleSearchWithFilters = useCallback(() => {\n"
            content += f"    const params: {screen_name}SearchParams = {{\n"
            for combo in search_combos:
                combo_id = combo.get('id', '')
                camel_id = to_camel_case(combo_id)
                content += f"      {camel_id}: typeof searchFilters.{camel_id} === 'string' ? searchFilters.{camel_id} : null,\n"
            content += "    };\n"
            content += "    return handleSearch(params);\n"
            content += "  }, [handleSearch, searchFilters]);\n\n"

        # handleGridInitialized = base + attachHeaderTreeDrag
        if has_grid:
            content += "  const handleGridInitialized = useCallback((grid: FlexGrid) => {\n"
            content += "    handleGridInitializedBase(grid);\n"
            content += f"    attachHeaderTreeDrag(grid, {{\n"
            content += f"      tree: {header_tree_name},\n"
            content += "    });\n"
            content += "  }, [handleGridInitializedBase]);\n\n"

        # CommonButtonsProps assembly
        content += "  const commonButtonProps: CommonButtonsProps = {\n"
        content += f"    title: i18n.t('{screen_title}'),\n"
        if has_auth_check:
            content += "    can: pageCrudAuthCheck.can,\n"
        content += "    actions: {\n"
        content += "      createCommand: handleCreate,\n"
        content += "      deleteCommand: handleDelete,\n"
        if has_combos:
            content += "      searchCommand: handleSearchWithFilters,\n"
        else:
            content += "      searchCommand: handleSearch,\n"
        content += "      commitCommand: handleCommit,\n"
        content += "      excelCommand: handleExcel,\n"
        content += "    },\n"
        content += "  };\n\n"

    # === Return JSX ===
    content += "  return (\n"
    content += f"    <{view_name}\n"
    content += "      commonButtonsProps={commonButtonProps}\n"

    # searchSection
    if has_combos:
        combo_ready_checks = []
        for combo in search_combos:
            inner_ds = combo.get('innerdataset', '')
            if inner_ds.startswith('@'):
                inner_ds = inner_ds[1:]
            if inner_ds:
                ds_var = to_var_name(inner_ds)
                check = f"{ds_var}.length > 0"
                if check not in combo_ready_checks:
                    combo_ready_checks.append(check)

        if combo_ready_checks:
            content += "      searchSection={(\n"
            content += f"        isSearchComboReady ? <SearchConditionFields\n"
            content += "          fields={searchFields}\n"
            content += "          values={searchFilters}\n"
            content += "          onValuesChange={setSearchFilters}\n"
            content += "        /> : '로딩중...'\n"
            content += "      )}\n"
        else:
            content += "      searchSection={\n"
            content += "        <SearchConditionFields\n"
            content += "          fields={searchFields}\n"
            content += "          values={searchFilters}\n"
            content += "          onValuesChange={setSearchFilters}\n"
            content += "        />\n"
            content += "      }\n"

    if is_multi_grid:
        for gi in grid_infos:
            content += f"      onGrid{gi['idx']}Initialized={{handleGrid{gi['idx']}Initialized}}\n"
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
    """Main function to generate View and Page (v2.0)"""

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

    # 1. View Component
    view_name = generate_view(meta_data, output_dir, component_name)

    # 2. Page Component
    generate_page(meta_data, output_dir, component_name, view_name, camel_name)

    print(f"\n{'='*60}")
    print(f"Generation complete!")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    generate_view_and_page(screen_name)
