from .db import db, environment, SCHEMA
from sqlalchemy import DateTime, String, Integer
from datetime import datetime, timedelta  
from ..config import Config
import os
import json

class Article(db.Model):
    __tablename__ = 'articles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    VALID_DISPLAY_TYPES = {'headline', 'sidebar_1', 'sidebar_2', 'sidebar_3', 'list', 'ads_1', 'ads_2', 'archived'}
    VALID_SECTIONS = {'national', 'world', 'business', 'sports', 'entertainment', 'technology'}

    id = db.Column(Integer, primary_key=True, autoincrement=True)
    title = db.Column(String(255), nullable=False)
    display_type = db.Column(String(50), nullable=False)  # Enforce in Frontend: 'headline', 'sidebar_1', etc.
    content = db.Column(db.Text, nullable=False)
    image_filename = db.Column(String(255)) 
    youtube_embed_url = db.Column(String(255))
    location = db.Column(String(255), nullable=False)
    contributors = db.Column(db.Text)
    author_id = db.Column(Integer, db.ForeignKey('users.id'), nullable=False)
    section = db.Column(String(50), nullable=False)  # Enforce in Frontend: 'national', 'world', etc.
    tags = db.Column(db.Text, nullable=False, default='[]') 
    created_at = db.Column(DateTime, server_default=db.func.current_timestamp())
    updated_at = db.Column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    version_history = db.Column(db.Text, default='[]')  

    # RELATIONSHIPS
    author_id = db.Column(Integer, db.ForeignKey('users.id'), nullable=False)
    author = db.relationship('User', back_populates='articles')

    def to_dict(self):
        """Convert model instance to a dictionary for easy JSON responses."""
        image_url = f"/media/uploads/{self.image_filename}" if self.image_filename else None
        return {
            'id': self.id,
            'title': self.title,
            'display_type': self.display_type,
            'content': self.content,
            'image_filename': self.image_filename,  
            'image_url': image_url,
            'youtube_embed_url': self.youtube_embed_url,
            'location': self.location,
            'contributors': self.contributors,
            'author_id': self.author_id,
            'section': self.section,
            'tags': json.loads(self.tags) if self.tags else [],  
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'version_history': json.loads(self.version_history) if self.version_history else []  
        }

    def delete_associated_file(self):
        """Delete the associated image file when the article is deleted."""
        if self.image_filename:
            file_path = os.path.join(Config.UPLOAD_FOLDER, self.image_filename)
            if os.path.exists(file_path):
                os.remove(file_path)

    @staticmethod
    def archive_old_articles():
        """Automatically archive articles older than 7 days."""
        expiration_time = datetime.utcnow() - timedelta(days=7) 
        db.session.query(Article).filter(
            Article.created_at < expiration_time,
            Article.display_type != 'archived'
        ).update({Article.display_type: 'archived'}, synchronize_session=False)
        db.session.commit()

    def set_tags(self, tags):
        """Set tags with validation."""
        if not isinstance(tags, list):
            raise ValueError("Tags must be a list")
        self.tags = json.dumps(tags)

    def set_version_history(self, history):
        """Set version history with validation."""
        if not isinstance(history, list):
            raise ValueError("Version history must be a list")
        self.version_history = json.dumps(history)

    def set_display_type(self, display_type):
        """Set display_type with validation."""
        if display_type not in self.VALID_DISPLAY_TYPES:
            raise ValueError(f"Invalid display_type: {display_type}")
        self.display_type = display_type

    def set_section(self, section):
        """Set section with validation."""
        if section not in self.VALID_SECTIONS:
            raise ValueError(f"Invalid section: {section}")
        self.section = section