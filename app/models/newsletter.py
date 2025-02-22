from .db import db, environment, SCHEMA
from sqlalchemy import Integer, Text, TIMESTAMP
from datetime import datetime
import json

class Newsletter(db.Model):
    __tablename__ = 'newsletters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(Integer, primary_key=True, autoincrement=True)
    reader_id = db.Column(Integer, db.ForeignKey('users.id'), nullable=False)
    # Enforce in Frontend: 'daily_morning', 'daily_evening', 'weekly', 'monthly', 'real_time'
    frequency = db.Column(Text, nullable=False)  # Stored as string
    # Enforce in Frontend:'top_headlines', 'in_depth', 'opinion', 'trending', 'local_news'
    content_type = db.Column(Text, nullable=False)  
    topics = db.Column(Text)  
    notification_preferences = db.Column(Text)  
    created_at = db.Column(TIMESTAMP, server_default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'reader_id': self.reader_id,
            'frequency': self.frequency,
            'content_type': self.content_type,
            'topics': json.loads(self.topics) if self.topics else None,
            'notification_preferences': json.loads(self.notification_preferences) if self.notification_preferences else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
