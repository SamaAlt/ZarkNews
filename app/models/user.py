from .db import db, environment, SCHEMA 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Integer, String, Enum
import uuid
from sqlalchemy.dialects.postgresql import TIMESTAMP

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Use INT for the id field instead of UUID
    id = db.Column(
        Integer,  # Changed to INT (Integer) as per the schema
        primary_key=True, 
        autoincrement=True  # Auto-increment ID as the schema defines
    )   
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('editor', 'admin', name='user_roles'), nullable=False, default='editor')  # Default role is 'editor'
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id, 
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }