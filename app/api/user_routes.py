from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

def editor_required(func):
    """
    Custom decorator to require the editor role for route access.
    """
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated and current_user.role == 'editor':
            return func(*args, **kwargs)
        return {'errors': {'message': 'Unauthorized'}}, 401
    return wrapper

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    if current_user.role == 'editor':  # You can view user data if you're an editor
        users = User.query.all()
        return {'users': [user.to_dict() for user in users]}
    return {'errors': {'message': 'Unauthorized'}}, 401


@user_routes.route('/<int:id>')
@login_required
@editor_required  # Ensures that only editors can view this route
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user:
        return user.to_dict()
    return {'errors': {'message': 'User not found'}}, 404
