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
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    articles = Article.query.order_by(Article.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        'articles': [article.to_dict() for article in articles.items],
        'total_pages': articles.pages,
        'current_page': articles.page
    }), 200

@article_routes.route('/my-articles', methods=['GET'])
@login_required
def get_my_articles():
    """
    Get articles authored by the currently logged-in user with pagination.
    """
    user_id = current_user.id
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)

    # Query articles with pagination, sorted by created_at in descending order
    articles = Article.query.filter_by(author_id=user_id).order_by(Article.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'articles': [article.to_dict() for article in articles.items],
        'total_pages': articles.pages,
        'current_page': articles.page
    }), 200

@article_routes.route('/<int:id>', methods=['GET'])
def get_article(id):
    """
    Get a specific article by ID.
    """
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404
    return jsonify(article.to_dict()), 200

@article_routes.route('/filter', methods=['GET'])
def filter_articles():
    """
    Filter articles by display_type and section.
    Returns the most recent articles matching the filters.
    """
    display_type = request.args.get('display_type', default=None, type=str)
    section = request.args.get('section', default=None, type=str)

    # Base query
    query = Article.query

    # Apply filters if provided
    if display_type:
        query = query.filter_by(display_type=display_type)
    if section:
        query = query.filter_by(section=section)

    # Order by most recent and ensure unique articles
    articles = query.order_by(Article.created_at.desc()).all()

    # Log the articles being returned
    print("Filtered Articles:", [article.id for article in articles])

    return jsonify({
        'articles': [article.to_dict() for article in articles]
    }), 200

@article_routes.route('', methods=['POST'])
@login_required
def create_article():
    """
    Create a new article.
    """
    # Get JSON data from the request
    data = request.get_json()

    # List of required fields
    required_fields = ['title', 'display_type', 'content', 'location', 'section']

    # Validate that all required fields are present and not empty
    errors = []
    for field in required_fields:
        if field not in data or not data[field].strip():  # Check if field is missing or empty (after trimming whitespace)
            errors.append(f"{field.capitalize()} cannot be empty")

    # If there are validation errors, return them with a 400 status code
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        # Create a new Article instance
        article = Article(
            title=data['title'].strip(),  # Trim whitespace
            display_type=data['display_type'].strip(),
            content=data['content'].strip(),
            location=data['location'].strip(),
            section=data['section'].strip(),
            author_id=current_user.id  # Set the author to the current user
        )

        # Optionally handle tags if they are provided
        if 'tags' in data:
            article.set_tags(data['tags'])

        # Add the article to the database session and commit
        db.session.add(article)
        db.session.commit()

        # Return the created article as a JSON response with a 201 status code
        return jsonify(article.to_dict()), 201

    except ValueError as e:
        # Handle any value-related errors (e.g., invalid display_type or section)
        return jsonify({"errors": [str(e)]}), 400

    except Exception as e:
        # Handle any other unexpected errors
        db.session.rollback()  # Rollback the session in case of an error
        return jsonify({"errors": ["An unexpected error occurred while creating the article"]}), 500

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
    if (article.author_id != current_user.id and 
        current_user.role != 'admin'):
        return jsonify({"errors": ["Unauthorized"]}), 403

    data = request.get_json()

    # Validate that required fields are not empty
    required_fields = ['title', 'display_type', 'content', 'location', 'section']
    for field in required_fields:
        if field in data and not data[field]:
            return jsonify({"errors": [f"{field} cannot be empty"]}), 400

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
        if 'image_filename' in data:
            article.image_filename = data['image_filename']
        if 'contributors' in data:
            article.contributors = data['contributors']

        # Create a new version history entry if any field is updated
        if any(field in data for field in ['title', 'content', 'display_type', 'location', 'section', 'tags', 'image_filename', 'contributors']):
            new_version = {
                'timestamp': datetime.utcnow().isoformat(),
                'title': article.title,
                'content': article.content,
                'display_type': article.display_type,
                'location': article.location,
                'section': article.section,
                'tags': article.tags,
                'image_filename': article.image_filename,
                'contributors': article.contributors
            }

            # Ensure version_history is a list
            if not article.version_history:
                article.version_history = []
            elif isinstance(article.version_history, str):
                # Deserialize if it's stored as a string (e.g., JSON)
                article.version_history = json.loads(article.version_history)

            article.version_history.append(new_version)

            # Serialize version_history back to a JSON string for storage
            article.version_history = json.dumps(article.version_history)

        db.session.commit()
        return jsonify(article.to_dict()), 200
    except ValueError as e:
        return jsonify({"errors": [str(e)]}), 400
    except json.JSONDecodeError as e:
        return jsonify({"errors": ["Invalid JSON data"]}), 400

@article_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_article(id):
    """
    Delete an article by ID.
    """
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404

    if article.author_id != current_user.id and current_user.role != 'admin':
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

@article_routes.route('/archive', methods=['GET'])
def get_archived_articles():
    archive_threshold = datetime.utcnow() - timedelta(days=7)
    archived_articles = Article.query.filter(Article.created_at < archive_threshold).order_by(Article.created_at.desc()).all()
    return jsonify({'archived_articles': [article.to_dict() for article in archived_articles]}), 200

@article_routes.route('/archive/<int:id>', methods=['GET'])
def get_archived_article(id):
    article = Article.query.get(id)
    if not article:
        return jsonify({"errors": ["Article not found"]}), 404

    archive_threshold = datetime.utcnow() - timedelta(days=7)
    if article.created_at >= archive_threshold:
        return jsonify({"errors": ["Article is not archived"]}), 400

    return jsonify(article.to_dict()), 200

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