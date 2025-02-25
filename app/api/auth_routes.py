from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db
from werkzeug.security import generate_password_hash

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('', methods=['GET'])
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict()), 200
    return jsonify({'errors': {'message': 'Unauthorized'}}), 401

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter(User.email == email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify(user.to_dict()), 200
    return jsonify({'errors': {'message': 'Invalid credentials'}}), 401

@auth_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    """
    Logs a user out and redirects to login.
    """
    logout_user()
    return redirect('/login')  

@auth_routes.route('/unauthorized', methods=['GET'])
def unauthorized():
    """
    Handles unauthorized access.
    """
    return jsonify({'errors': {'message': 'Unauthorized'}}), 401

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user, logs them in, and returns their information.
    """
    data = request.get_json()

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  

    # Ensure required fields are present
    required_fields = [first_name, last_name, email, password, role]
    if not all(required_fields):
        return jsonify({'errors': ['All fields are required']}), 400

    # Check if email is already used
    if User.query.filter(User.email == email).first():
        return jsonify({'errors': ['Email address is already in use.']}), 400

    # Hash the password before saving
    hashed_password = generate_password_hash(password)

    # Create new user 
    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password_hash=hashed_password,
        role=role
    )

    db.session.add(user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': ['Database error: ' + str(e)]}), 500

    login_user(user)
    return jsonify(user.to_dict()), 200