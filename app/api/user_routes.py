from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from marshmallow import Schema, fields, validate, ValidationError
from werkzeug.security import generate_password_hash, check_password_hash

# User Schema for validation
class UserUpdateSchema(Schema):
    first_name = fields.String(validate=validate.Length(min=1, max=100))
    last_name = fields.String(validate=validate.Length(min=1, max=100))
    email = fields.Email(required=False)
    password = fields.String(validate=validate.Length(min=6), required=False)  
    username = fields.String(validate=validate.Length(min=3, max=30))
    phone_number = fields.String(validate=validate.Regexp(r'^\+?[1-9]\d{1,14}$'), required=False)
    street = fields.String(validate=validate.Length(min=1, max=255))
    city = fields.String(validate=validate.Length(min=1, max=100))
    state = fields.String(validate=validate.Length(min=1, max=100))
    country = fields.String(validate=validate.Length(min=1, max=100))
    postal_code = fields.String(validate=validate.Length(min=1, max=20))

user_routes = Blueprint('users', __name__)

@user_routes.route('', methods=['GET'])
@login_required
def get_users():
    """
    Get all users (excluding deleted users).
    """
    if current_user.role != 'editor':
        return jsonify({"errors": ["Unauthorized"]}), 403

    # Exclude users marked as deleted
    users = User.query.filter(~User.email.startswith('deleted-')).all()
    return jsonify({'users': [user.to_dict() for user in users]}), 200

@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_user(id):
    """
    Get a specific user by ID (excluding deleted users).
    """
    user = User.query.filter(User.id == id, ~User.email.startswith('deleted-')).first()
    if not user:
        return jsonify({"errors": ["User not found"]}), 404
    return jsonify(user.to_dict()), 200

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    if current_user.role not in ['editor', 'admin']:
        return jsonify({"errors": ["Unauthorized"]}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"errors": ["User not found"]}), 404

    schema = UserUpdateSchema()
    try:
        data = schema.load(request.get_json())  # Validate and deserialize
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    # Log incoming data
    print("Incoming data from frontend:", data)

    # Apply updates to the user
    for key, value in data.items():
        if hasattr(user, key):
            if key == 'password' and value:
                print("Updating password...")
                user.password = value  # Use the password setter
                print("Hashed password:", user.password_hash)  # Log hashed password
            else:
                setattr(user, key, value)

    # Log updated user object
    print("Updated user object:", user.to_dict())

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print("Error committing to database:", str(e))
        return jsonify({"errors": ["Database error"]}), 500

    return jsonify(user.to_dict()), 200


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Soft delete a user by ID.
    """
    if current_user.role != 'editor':
        return jsonify({"errors": ["Unauthorized"]}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"errors": ["User not found"]}), 404

    try:
        # Mark the user as deleted by prefixing their email
        user.email = f"deleted-{user.email}"
        db.session.commit()
        return jsonify({"message": "User account deactivated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print("Error soft-deleting user:", str(e))
        return jsonify({"errors": ["Database error: " + str(e)]}), 500
    if current_user.role != 'editor':
        return jsonify({"errors": ["Unauthorized"]}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"errors": ["User not found"]}), 404

    try:
        # Mark the user as deleted by prefixing their email
        user.email = f"deleted-{user.email}"
        db.session.commit()
        return jsonify({"message": "User account deactivated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print("Error soft-deleting user:", str(e))
        return jsonify({"errors": ["Database error: " + str(e)]}), 500  

    if current_user.role != 'editor':
        return jsonify({"errors": ["Unauthorized"]}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"errors": ["User not found"]}), 404

    try:
        # Soft delete the user
        user.deleted = True
        db.session.commit()
        return jsonify({"message": "User account deactivated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print("Error soft-deleting user:", str(e))
        return jsonify({"errors": ["Database error: " + str(e)]}), 500
    """
    Delete a user by ID
    """
    if current_user.role != 'editor':
        return jsonify({"errors": ["Unauthorized"]}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"errors": ["User not found"]}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print("Error deleting user:", str(e))  # Log the error
        return jsonify({"errors": ["Database error: " + str(e)]}), 500