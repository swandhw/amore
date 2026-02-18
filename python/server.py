"""
server.py - Flask API 서버
메뉴/파일 조회, 파일 내용 조회, zip 다운로드

실행: python server.py
포트: 5000
"""

import io
import zipfile
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from db_utils import get_db_connection

app = Flask(__name__)
CORS(app)


# ─── API 엔드포인트 ────────────────────────────────────────────

@app.route('/api/menus', methods=['GET'])
def get_menus():
    """전체 메뉴 + 파일 목록"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, menuNm, menuHnm FROM menus ORDER BY id")
            menus = cursor.fetchall()

            for menu in menus:
                cursor.execute(
                    "SELECT id, menuId, folder, exetension, fileNm, isRefined FROM files WHERE menuId = %s ORDER BY id",
                    (menu['id'],)
                )
                menu['files'] = cursor.fetchall()

        return jsonify(menus)
    finally:
        conn.close()


@app.route('/api/files/<int:file_id>/content', methods=['GET'])
def get_file_content(file_id):
    """파일 내용 조회 (DB에서 fileContent 읽기)"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT fileNm, fileContent, folder, exetension FROM files WHERE id = %s",
                (file_id,)
            )
            row = cursor.fetchone()

        if not row:
            return jsonify({'error': '파일 없음'}), 404

        path = row['fileNm']
        if row['folder'] and row['folder'] != '.':
            path = f"{row['folder']}/{row['fileNm']}"

        return jsonify({
            'filename': row['fileNm'],
            'path': path,
            'content': row['fileContent'] or ''
        })
    finally:
        conn.close()


@app.route('/api/menus/<int:menu_id>/download', methods=['GET'])
def download_menu_files(menu_id):
    """메뉴별 zip 다운로드 (isRefined=1 파일만)"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT menuNm FROM menus WHERE id = %s", (menu_id,))
            menu = cursor.fetchone()
            if not menu:
                return jsonify({'error': '메뉴 없음'}), 404

            cursor.execute(
                "SELECT fileNm, fileContent, folder FROM files WHERE menuId = %s AND isRefined = 1",
                (menu_id,)
            )
            files = cursor.fetchall()

        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
            for f in files:
                if f['fileContent']:
                    arc_name = f['fileNm']
                    if f['folder'] and f['folder'] != '.':
                        arc_name = f"{f['folder']}/{f['fileNm']}"
                    zf.writestr(arc_name, f['fileContent'])

        buffer.seek(0)
        return send_file(
            buffer,
            mimetype='application/zip',
            as_attachment=True,
            download_name=f"{menu['menuNm']}.zip"
        )
    finally:
        conn.close()


@app.route('/api/download-all', methods=['GET'])
def download_all_files():
    """전체 zip 다운로드 (isRefined=1 파일만)"""
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT m.menuNm, f.fileNm, f.fileContent, f.folder
                FROM files f
                JOIN menus m ON f.menuId = m.id
                WHERE f.isRefined = 1
                ORDER BY m.menuNm
            """)
            rows = cursor.fetchall()

        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
            for row in rows:
                if row['fileContent']:
                    arc_name = row['fileNm']
                    if row['folder'] and row['folder'] != '.':
                        arc_name = f"{row['folder']}/{row['fileNm']}"
                    zf.writestr(f"{row['menuNm']}/{arc_name}", row['fileContent'])

        buffer.seek(0)
        return send_file(
            buffer,
            mimetype='application/zip',
            as_attachment=True,
            download_name='all_files.zip'
        )
    finally:
        conn.close()


if __name__ == '__main__':
    print("Flask API Server starting on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
