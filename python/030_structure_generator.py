import os
import sys
import json
import re

# Configuration (환경변수 우선, 없으면 스크립트 위치 기준)
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_ROOT = os.path.dirname(_SCRIPT_DIR)
TOBE_BASE_DIR = os.environ.get('TOBE_BASE_DIR', os.path.join(_PROJECT_ROOT, "shell-kit", "src", "pages", "local-routes"))


def to_pascal_case(snake_str):
    """SNAKE_CASE 또는 underscore 구분 문자열을 PascalCase로 변환"""
    if not snake_str:
        return ""
    components = snake_str.split('_')
    return ''.join(x.capitalize() for x in components)


def to_camel_case(text):
    """SNAKE_CASE를 camelCase로 변환"""
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:] if pascal else ''


def to_kebab_case(text):
    """SNAKE_CASE를 kebab-case로 변환 (규칙.pdf 1.9 폴더 구조)"""
    if not text:
        return ""
    return text.lower().replace('_', '-')


def create_structure(screen_name=None):
    # 화면명이 없으면 TOBE 폴더에서 첫 번째 폴더 사용
    if screen_name is None:
        dirs = [d for d in os.listdir(TOBE_BASE_DIR) if os.path.isdir(os.path.join(TOBE_BASE_DIR, d))]
        if dirs:
            screen_name = dirs[0]
        else:
            print("Error: No screen folder found in TOBE")
            return

    # 폴더명: camelCase, 컴포넌트명: PascalCase
    folder_name = to_camel_case(screen_name) if '_' in screen_name else screen_name.lower()
    component_name = to_pascal_case(screen_name) if '_' in screen_name else screen_name[0].upper() + screen_name[1:]

    # 출력 디렉토리 설정
    output_dir = os.path.join(TOBE_BASE_DIR, folder_name)
    meta_file = os.path.join(output_dir, f"{component_name}.META.json")

    if not os.path.exists(meta_file):
        print(f"Error: META file not found at {meta_file}")
        return

    with open(meta_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Creating structure for {folder_name} (component: {component_name})...")

    # 폴더 구조
    subdirs = [
        "hooks",
        "api",
        "types"
    ]

    for subd in subdirs:
        path = os.path.join(output_dir, subd)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"Created: {path}")
        else:
            print(f"Exists: {path}")

    # constants.ts 는 페이지 루트에 위치
    for root_file in ["constants.ts"]:
        file_path = os.path.join(output_dir, root_file)
        if not os.path.exists(file_path):
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(f"// {root_file} - {component_name}\n")
            print(f"Created: {file_path}")
        else:
            print(f"Exists: {file_path}")

    print("=== Structure Generation Complete ===")
    return output_dir

if __name__ == "__main__":
    # 명령줄 인자로 화면명 받기
    screen_name = sys.argv[1] if len(sys.argv) > 1 else None
    create_structure(screen_name)
