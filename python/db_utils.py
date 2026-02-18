"""
db_utils.py - MySQL DB 공용 유틸리티
orchestrator.py, server.py 에서 공용 사용
"""

import pymysql

DB_CONFIG = {
    'host': '175.126.146.186',
    'port': 3306,
    'user': 'amoreUser',
    'password': 'amorePw',
    'database': 'amoreDbtest',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}


def get_db_connection():
    return pymysql.connect(**DB_CONFIG)


def upsert_menu(menu_nm: str, menu_hnm: str = '') -> int:
    """메뉴 upsert, menu id 반환"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id FROM menus WHERE menuNm = %s", (menu_nm,))
            existing = cursor.fetchone()
            if existing:
                if menu_hnm:
                    cursor.execute(
                        "UPDATE menus SET menuHnm = %s WHERE id = %s",
                        (menu_hnm, existing['id'])
                    )
                conn.commit()
                return existing['id']
            else:
                cursor.execute(
                    "INSERT INTO menus (menuNm, menuHnm) VALUES (%s, %s)",
                    (menu_nm, menu_hnm)
                )
                conn.commit()
                return cursor.lastrowid
    finally:
        conn.close()


def upsert_file(menu_id: int, folder: str, extension: str, file_nm: str, file_content: str, is_refined: int = 0):
    """파일 upsert (fileNm 기준)"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id FROM files WHERE menuId = %s AND fileNm = %s",
                (menu_id, file_nm)
            )
            existing = cursor.fetchone()
            if existing:
                cursor.execute(
                    "UPDATE files SET folder = %s, exetension = %s, fileContent = %s, isRefined = %s WHERE id = %s",
                    (folder, extension, file_content, is_refined, existing['id'])
                )
            else:
                cursor.execute(
                    "INSERT INTO files (menuId, folder, exetension, fileNm, fileContent, isRefined) VALUES (%s, %s, %s, %s, %s, %s)",
                    (menu_id, folder, extension, file_nm, file_content, is_refined)
                )
            conn.commit()
    finally:
        conn.close()
