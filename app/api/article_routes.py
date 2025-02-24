from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Article, db
from app.config import Config
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import os
import json
from defusedxml import ElementTree as ET

# Initialize Blueprint
article_routes = Blueprint('articles', __name__)

# Ensure the upload folder exists
Config.ensure_upload_folder_exists()

# Maximum allowed file size (10 MB)
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

def is_svg_safe(file_path):
    """
    Validate that an SVG file is safe to use.
    """
    try:
        with open(file_path, 'r') as f:
            ET.parse(f)  # Attempt to parse the SVG file
        return True
    except ET.ParseError:
        return False  # The file is not a valid SVG
    except Exception:
        return False  # The file is potentially unsafe

@article_routes.route('', methods=['GET'])
def get_articles():
    """
    Get all articles.
    """
    articles = Article.query.all()
    return jsonify({'articles': [article.to_dict() for article in articles]}), 200

@article_routes.route('/<int:id>', methods=['GET'])
def get_article(id):
    """
    Get a specific article by ID.
    """
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404
    return jsonify(article.to_dict()), 200

@article_routes.route('', methods=['POST'])
@login_required
def create_article():
    """
    Create a new article.
    """
    data = request.get_json()

    required_fields = ['title', 'display_type', 'content', 'location', 'section']
    if not all(field in data for field in required_fields):
        return jsonify({"errors": ["All fields are required"]}), 400

    try:
        article = Article(
            title=data['title'],
            display_type=data['display_type'],
            content=data['content'],
            location=data['location'],
            section=data['section'],
            author_id=current_user.id
        )

        if 'tags' in data:
            article.set_tags(data['tags'])

        db.session.add(article)
        db.session.commit()
        return jsonify(article.to_dict()), 201
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 400

@article_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_article(id):
    """
    Update an existing article by ID.
    """
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404

    # Allow update if the user is the author OR an admin
    if (article.author_id != current_user.id or 
        current_user.role != 'admin'):
        return jsonify({"errors": ["Unauthorized"]}), 403

    data = request.get_json()

    try:
        if 'title' in data:
            article.title = data['title']
        if 'display_type' in data:
            article.set_display_type(data['display_type'])
        if 'content' in data:
            article.content = data['content']
        if 'location' in data:
            article.location = data['location']
        if 'section' in data:
            article.set_section(data['section'])
        if 'tags' in data:
            article.set_tags(data['tags'])

        db.session.commit()
        return jsonify(article.to_dict()), 200
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 400

@article_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_article(id):
    """
    Delete an article by ID.
    """
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404

    if article.author_id != current_user.id or current_user.role != 'admin':
        return jsonify({"errors": ["Unauthorized"]}), 403

    article.delete_associated_file()
    db.session.delete(article)
    db.session.commit()
    return jsonify({"message": "Article deleted successfully"}), 200

@article_routes.route('/archive', methods=['POST'])
@login_required
def archive_articles():
    """
    Archive articles older than 7 days.
    """
    if current_user.role not in ['admin']:
        return jsonify({"errors": ["Unauthorized"]}), 403

    Article.archive_old_articles()
    return jsonify({"message": "Old articles archived successfully"}), 200

@article_routes.route('/upload', methods=['POST'])
@login_required
def upload_article_image():
    """
    Upload an image for an article.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check file size
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)
    if file_size > MAX_FILE_SIZE:
        return jsonify({"error": "File size exceeds the maximum allowed size (10 MB)"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(file_path)

        # Additional validation for SVG files
        if filename.endswith('.svg') and not is_svg_safe(file_path):
            os.remove(file_path)  # Delete the file if it's not safe
            return jsonify({"error": "Invalid or unsafe SVG file"}), 400

        return jsonify({"url": f"/media/uploads/{filename}"}), 200

    return jsonify({"error": "File type not allowed"}), 400