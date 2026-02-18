"""
orchestrator.py - ASIS 폴더 스캔 후 020~060 일괄 실행

사용법:
    python orchestrator.py                          # 대화형 모드 (목록 보고 선택)
    python orchestrator.py --list                   # UI 폴더 목록만 출력
    python orchestrator.py --all                    # 모든 화면 변환
    python orchestrator.py --all --tag 0218_01      # 태그 지정하여 모든 화면 변환
    python orchestrator.py --screen 화면명          # 특정 화면만 변환
    python orchestrator.py --system APGQMS          # 특정 시스템만 변환
    python orchestrator.py --module Q01_MASTER      # 특정 모듈만 변환

폴더 구조:
    ASIS/{SYSTEM}/workspace/{SYSTEM}/{MODULE}/{SCREEN_NAME}/UI/ASIS/{SCREEN_NAME}.xfdl
    예: ASIS/APGQMS/workspace/APGQMS/Q01_MASTER/D_MMASM_MENU/UI/ASIS/D_MMASM_MENU.xfdl

출력 경로:
    shell-kit/src/pages/local-routes/{tag}/{screenFolder}/
    예: shell-kit/src/pages/local-routes/0218_01/dMmasmMenu/
"""

import os
import sys
import subprocess
import argparse
import json
from datetime import datetime
from dataclasses import dataclass
from typing import List, Optional
from db_utils import upsert_menu, upsert_file


# 경로 설정 (스크립트 위치 기준으로 동적 계산)
SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPTS_DIR)
ASIS_BASE_DIR = os.path.join(PROJECT_ROOT, "ASIS")
TOBE_BASE_ROOT = os.path.join(PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes")

# 제외할 화면 목록
EXCLUDE_SCREENS = {'FILE_MANAGER'}


def resolve_tag(tag: Optional[str] = None) -> str:
    """출력 태그 결정 (MMDD_NN 형식, 미지정시 자동 생성)"""
    if tag:
        return tag
    today = datetime.now().strftime('%m%d')
    seq = 1
    while os.path.exists(os.path.join(TOBE_BASE_ROOT, f"{today}_{seq:02d}")):
        seq += 1
    return f"{today}_{seq:02d}"


# TOBE_BASE_DIR는 main()에서 --tag 파싱 후 설정
TOBE_BASE_DIR = TOBE_BASE_ROOT


@dataclass
class ScreenInfo:
    """화면 정보"""
    screen_name: str      # D_MMASM_MENU
    system: str           # APGQMS
    module: str           # Q01_MASTER
    ui_path: str          # .../UI
    xfdl_path: str        # .../UI/ASIS/D_MMASM_MENU.xfdl

    @property
    def folder_name(self):
        """React 폴더명 (camelCase)"""
        return self._to_camel_case(self.screen_name)

    @property
    def component_name(self):
        """React 컴포넌트명 (PascalCase)"""
        return self._to_pascal_case(self.screen_name)

    @staticmethod
    def _to_camel_case(snake_str):
        """SNAKE_CASE를 camelCase로 변환"""
        if not snake_str:
            return ""
        components = snake_str.split('_')
        return components[0].lower() + ''.join(x.capitalize() for x in components[1:])

    @staticmethod
    def _to_kebab_case(snake_str):
        """SNAKE_CASE를 kebab-case로 변환"""
        if not snake_str:
            return ""
        return snake_str.lower().replace('_', '-')

    @staticmethod
    def _to_pascal_case(snake_str):
        if not snake_str:
            return ""
        components = snake_str.split('_')
        return ''.join(x.capitalize() for x in components)

    @staticmethod
    def _to_camel_case(snake_str):
        pascal = ScreenInfo._to_pascal_case(snake_str)
        return pascal[0].lower() + pascal[1:] if pascal else ''


def scan_asis_folder(base_dir: str = ASIS_BASE_DIR) -> List[ScreenInfo]:
    """ASIS 폴더를 스캔하여 모든 화면 정보 추출

    폴더 구조: ASIS/{SYSTEM}/workspace/{SYSTEM}/{MODULE}/{SCREEN_NAME}/UI/ASIS/{SCREEN_NAME}.xfdl
    """
    screens = []

    for root, dirs, files in os.walk(base_dir):
        # UI 폴더 찾기
        if os.path.basename(root) == "UI":
            asis_subdir = os.path.join(root, "ASIS")
            if not os.path.exists(asis_subdir):
                continue

            # XFDL 파일 찾기
            xfdl_files = [f for f in os.listdir(asis_subdir) if f.endswith('.xfdl')]
            if not xfdl_files:
                continue

            xfdl_path = os.path.join(asis_subdir, xfdl_files[0])
            screen_name = xfdl_files[0].replace('.xfdl', '')

            # 제외 화면 건너뛰기
            if screen_name.upper() in EXCLUDE_SCREENS:
                continue

            # 경로에서 시스템/모듈 추출
            # .../ASIS/APGQMS/workspace/APGQMS/Q01_MASTER/D_MMASM_MENU/UI
            path_parts = root.replace('\\', '/').split('/')

            system = ""
            module = ""

            # workspace 다음이 시스템, 그 다음이 모듈
            try:
                workspace_idx = path_parts.index('workspace')
                if workspace_idx + 1 < len(path_parts):
                    system = path_parts[workspace_idx + 1]
                if workspace_idx + 2 < len(path_parts):
                    module = path_parts[workspace_idx + 2]
            except ValueError:
                pass

            screens.append(ScreenInfo(
                screen_name=screen_name,
                system=system,
                module=module,
                ui_path=root,
                xfdl_path=xfdl_path
            ))

    # 시스템 > 모듈 > 화면명 순으로 정렬
    screens.sort(key=lambda x: (x.system, x.module, x.screen_name))
    return screens


def run_transformation(screen: ScreenInfo, verbose: bool = True) -> bool:
    """단일 화면 변환 실행 (020 ~ 060)"""

    if verbose:
        print(f"\n{'='*70}")
        print(f"Processing: {screen.screen_name}")
        print(f"System: {screen.system} / Module: {screen.module}")
        print(f"UI Path: {screen.ui_path}")
        print(f"XFDL: {screen.xfdl_path}")
        print(f"Output: {TOBE_BASE_DIR}/{screen.folder_name}")
        print(f"{'='*70}")

    asis_source = os.path.join(screen.ui_path, "ASIS")

    # 스크립트 순차 실행
    scripts = [
        ("020_source_analyzer.py", [screen.screen_name, asis_source]),
        ("030_structure_generator.py", [screen.screen_name]),
        ("040_dataset_transformer.py", [screen.screen_name]),
        ("050_api_logic_converter.py", [screen.screen_name]),
        ("060_view_page_assembler.py", [screen.screen_name]),
    ]

    # 환경변수로 TOBE_BASE_DIR 전달
    env = os.environ.copy()
    env['TOBE_BASE_DIR'] = TOBE_BASE_DIR

    for script, args in scripts:
        script_path = os.path.join(SCRIPTS_DIR, script)
        cmd = ["python", script_path] + args

        if verbose:
            print(f"\nRunning: python {script} {' '.join(args)}")

        result = subprocess.run(cmd, capture_output=True, text=True, env=env)

        if verbose and result.stdout:
            print(result.stdout)

        if result.returncode != 0:
            print(f"[ERROR] {script} failed:")
            print(result.stderr)
            return False

    # 변환 성공 후 DB 입력
    insert_to_db(screen, verbose)

    if verbose:
        print(f"\n[SUCCESS] {screen.screen_name} transformation complete!")

    return True


def read_file_content(file_path):
    """파일 내용 읽기 (utf-8 → euc-kr → cp949 폴백)"""
    for enc in ['utf-8', 'euc-kr', 'cp949']:
        try:
            with open(file_path, 'r', encoding=enc) as f:
                return f.read()
        except (UnicodeDecodeError, UnicodeError):
            continue
    return None


def insert_to_db(screen: ScreenInfo, verbose: bool = True):
    """변환 결과를 DB에 입력 (menus + files)"""
    try:
        output_dir = os.path.join(TOBE_BASE_DIR, screen.folder_name)
        if not os.path.exists(output_dir):
            if verbose:
                print(f"[DB] Output directory not found: {output_dir}")
            return

        # META.json 에서 titletext 읽기
        meta_path = os.path.join(output_dir, f"{screen.component_name}.META.json")
        title_text = ''
        if os.path.exists(meta_path):
            with open(meta_path, 'r', encoding='utf-8') as f:
                meta = json.load(f)
                title_text = meta.get('Form', {}).get('titletext', '')

        # menus upsert
        menu_id = upsert_menu(screen.folder_name, title_text)

        # xfdl 원본 파일 입력 (isRefined = 0)
        xfdl_filename = f"{screen.screen_name}.xfdl"
        xfdl_path = screen.xfdl_path
        if os.path.exists(xfdl_path):
            xfdl_content = read_file_content(xfdl_path)
            upsert_file(menu_id, '.', 'xfdl', xfdl_filename, xfdl_content or '', 0)

        # output 디렉토리 스캔하여 변환된 파일 입력 (isRefined = 1)
        for root, dirs, files_list in os.walk(output_dir):
            for filename in files_list:
                file_path = os.path.join(root, filename)
                rel_to_output = os.path.relpath(root, output_dir).replace('\\', '/')

                folder = '.' if rel_to_output == '.' else rel_to_output
                ext = os.path.splitext(filename)[1].lstrip('.')

                # xfdl 파일은 위에서 이미 처리 (원본 경로에서)
                if ext == 'xfdl':
                    continue

                content = read_file_content(file_path)
                upsert_file(menu_id, folder, ext, filename, content or '', 1)

        if verbose:
            print(f"[DB] {screen.screen_name} → DB 입력 완료 (menuId={menu_id})")

    except Exception as e:
        print(f"[DB ERROR] {e}")


def list_screens(screens: List[ScreenInfo]):
    """화면 목록 출력"""
    print(f"\n{'='*70}")
    print(f"Found {len(screens)} screens in ASIS folder")
    print(f"{'='*70}\n")

    current_system = ""
    current_module = ""

    for i, screen in enumerate(screens, 1):
        # 시스템 헤더
        if screen.system != current_system:
            current_system = screen.system
            print(f"\n[{current_system}]")

        # 모듈 헤더
        if screen.module != current_module:
            current_module = screen.module
            print(f"  └─ {current_module}")

        # 화면 정보
        print(f"      {i:3}. {screen.screen_name}")
        print(f"           → {screen.folder_name}/")


def interactive_mode(screens: List[ScreenInfo]):
    """대화형 모드"""
    list_screens(screens)

    print(f"\n{'='*70}")
    print("Options:")
    print("  - Enter number(s) to transform specific screens (e.g., 1,3,5 or 1-5)")
    print("  - Enter 'all' to transform all screens")
    print("  - Enter 'q' to quit")
    print(f"{'='*70}")

    choice = input("\nSelect: ").strip().lower()

    if choice == 'q':
        return

    if choice == 'all':
        targets = screens
    else:
        # 번호 파싱 (1,3,5 또는 1-5 형식)
        indices = set()
        for part in choice.split(','):
            part = part.strip()
            if '-' in part:
                start, end = part.split('-')
                indices.update(range(int(start), int(end) + 1))
            else:
                indices.add(int(part))

        targets = [screens[i-1] for i in sorted(indices) if 1 <= i <= len(screens)]

    if not targets:
        print("No screens selected.")
        return

    print(f"\nTransforming {len(targets)} screen(s)...")

    success = 0
    failed = 0

    for screen in targets:
        if run_transformation(screen):
            success += 1
        else:
            failed += 1

    print(f"\n{'='*70}")
    print(f"Transformation complete: {success} success, {failed} failed")
    print(f"{'='*70}")


def main():
    global TOBE_BASE_DIR

    parser = argparse.ArgumentParser(description='ASIS to React transformation orchestrator')
    parser.add_argument('--list', action='store_true', help='List all screens')
    parser.add_argument('--all', action='store_true', help='Transform all screens')
    parser.add_argument('--screen', type=str, help='Transform specific screen by name')
    parser.add_argument('--system', type=str, help='Transform all screens in a system')
    parser.add_argument('--module', type=str, help='Transform all screens in a module')
    parser.add_argument('--tag', type=str, help='Output tag (e.g., 0218_01). Auto-generated if omitted')
    parser.add_argument('--quiet', action='store_true', help='Quiet mode (less output)')

    args = parser.parse_args()

    # 출력 태그 결정 및 TOBE_BASE_DIR 설정
    tag = resolve_tag(args.tag)
    TOBE_BASE_DIR = os.path.join(TOBE_BASE_ROOT, tag)
    print(f"Output tag: {tag}")
    print(f"Output dir: {TOBE_BASE_DIR}")

    # ASIS 폴더 스캔
    print("Scanning ASIS folder...")
    screens = scan_asis_folder()

    if not screens:
        print("No screens found in ASIS folder.")
        return

    verbose = not args.quiet

    # 목록 출력
    if args.list:
        list_screens(screens)
        return

    # 필터링
    targets = screens

    if args.screen:
        targets = [s for s in screens if s.screen_name.upper() == args.screen.upper()]
    elif args.system:
        targets = [s for s in screens if s.system.upper() == args.system.upper()]
    elif args.module:
        targets = [s for s in screens if s.module.upper() == args.module.upper()]

    # 전체 변환
    if args.all or args.screen or args.system or args.module:
        if not targets:
            print(f"No matching screens found.")
            return

        print(f"Transforming {len(targets)} screen(s)...")

        success = 0
        failed = 0

        for screen in targets:
            if run_transformation(screen, verbose):
                success += 1
            else:
                failed += 1

        print(f"\n{'='*70}")
        print(f"Transformation complete: {success} success, {failed} failed")
        print(f"{'='*70}")
        return

    # 대화형 모드
    interactive_mode(screens)


if __name__ == "__main__":
    main()
