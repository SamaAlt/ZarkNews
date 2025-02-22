from .db import db, environment, SCHEMA 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy import Enum

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)   
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('editor', 'admin', 'reader', name='user_roles'), nullable=False, server_default='editor')  
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    # Reverse relationships
    # use lazy='dynamic' for better performance when querying for filtering, search, sorting, pagination, etc.
    # articles = db.relationship('Article', back_populates='author', lazy='dynamic')
    # newsletters = db.relationship('Newsletter', back_populates='author', lazy='dynamic')
    # research_diagrams = db.relationship('ResearchDiagram', back_populates='author', lazy='dynamic')

    @property
    def password(self):
        raise AttributeError("Password is not readable.")  # Prevent direct access

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
