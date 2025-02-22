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

    id = db.Column(Integer, primary_key=True, autoincrement=True)
    title = db.Column(String(255), nullable=False)
    # Enforce in Frontend: 'headline', 'sidebar_1', 'sidebar_2', 'sidebar_3', 'list', 'ads_1', 'ads_2', 'archived'
    display_type = db.Column(String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_filename = db.Column(String(255)) 
    youtube_embed_url = db.Column(String(255))
    location = db.Column(String(255), nullable=False)
    contributors = db.Column(db.Text)
    author_id = db.Column(Integer, db.ForeignKey('users.id'), nullable=False)
    # Enforce in Frontend:  'national', 'international', 'business', 'sports', 'entertainment', 'technology
    section = db.Column(String(50), nullable=False)  
    tags = db.Column(db.Text, nullable=False) 
    created_at = db.Column(DateTime, server_default=db.func.current_timestamp())
    updated_at = db.Column(DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    version_history = db.Column(db.Text, default='[]')  

    def to_dict(self):
        """Convert model instance to a dictionary for easy JSON responses."""
        # Construct the image URL based on the filename
        image_url = f"/static/uploads/{self.image_filename}" if self.image_filename else None
        return {
            'id': self.id,
            'title': self.title,
            'display_type': self.display_type,
            'content': self.content,
            'image_filename': self.image_filename,  
            'image_url': image_url,  # Include the full URL for frontend use
            'youtube_embed_url': self.youtube_embed_url,
            'location': self.location,
            'contributors': self.contributors,
            'author_id': self.author_id,
            'section': self.section,
            'tags': json.loads(self.tags) if self.tags else None,  
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