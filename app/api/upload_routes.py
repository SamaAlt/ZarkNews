from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from ..config import Config

upload_routes = Blueprint('uploads', __name__)

# Ensure the upload folder exists
Config.ensure_upload_folder_exists()

@upload_routes.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({"url": f"/static/uploads/{filename}"}), 200

    return jsonify({"error": "File type not allowed"}), 400

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS