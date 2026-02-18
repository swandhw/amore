import os
import sys
import subprocess
import venv

def setup_environment():
    print("=== 010_env_setup.py: 환경 설정 시작 ===")
    
    # 1. 가상환경 생성
    venv_dir = os.path.join(os.path.dirname(__file__), "venv")
    if not os.path.exists(venv_dir):
        print(f"가상환경 생성 중: {venv_dir}")
        venv.create(venv_dir, with_pip=True)
    else:
        print(f"가상환경이 이미 존재합니다: {venv_dir}")

    # 2. pip 업그레이드 및 라이브러리 설치
    # 윈도우 기준 activate 스크립트 경로가 아니라, python 실행 파일 경로를 직접 사용
    if sys.platform == "win32":
        pip_executable = os.path.join(venv_dir, "Scripts", "pip.exe")
    else:
        pip_executable = os.path.join(venv_dir, "bin", "pip")

    required_packages = ["xmltodict", "javalang", "black", "pandas"]
    
    print("패키지 설치 중...")
    
    # venv 내부의 python 실행 파일 경로
    if sys.platform == "win32":
        venv_python = os.path.join(venv_dir, "Scripts", "python.exe")
    else:
        venv_python = os.path.join(venv_dir, "bin", "python")

    try:
        # python -m pip install ... 형태로 실행
        subprocess.check_call([venv_python, "-m", "pip", "install", "--upgrade", "pip"])
        subprocess.check_call([venv_python, "-m", "pip", "install"] + required_packages)
        print("모든 패키지가 성공적으로 설치되었습니다.")
    except subprocess.CalledProcessError as e:
        print(f"패키지 설치 실패: {e}")
        sys.exit(1)

    print("=== 환경 설정 완료 ===")

if __name__ == "__main__":
    setup_environment()
