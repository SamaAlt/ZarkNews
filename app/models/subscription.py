# models/subscription.py
from .db import db, environment, SCHEMA
from sqlalchemy import DateTime, String, Integer
from datetime import datetime
import json

class Subscription(db.Model):
    __tablename__ = 'subscriptions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    VALID_FREQUENCIES = {'Daily', 'Weekly', 'Monthly'}
    VALID_SECTIONS = {'national', 'international', 'business', 'sports', 'entertainment', 'technology'}

    id = db.Column(Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(String(100), nullable=False)
    last_name = db.Column(String(100), nullable=False)
    email = db.Column(String(255), nullable=False, unique=True)
    frequency = db.Column(String(50), nullable=False)
    sections = db.Column(db.Text, default='[]')
    tags = db.Column(db.Text, default='[]')
    subscribed_at = db.Column(DateTime, server_default=db.func.current_timestamp())

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'frequency': self.frequency,
            'sections': json.loads(self.sections) if self.sections else [],
            'tags': json.loads(self.tags) if self.tags else [],
            'subscribed_at': self.subscribed_at.isoformat() if self.subscribed_at else None
        }
    @classmethod
    def subscribe(cls, first_name, last_name, email, sections=None, tags=None, frequency='Weekly'):
        """Create a new subscription."""
        subscription = cls(
            first_name=first_name,
            last_name=last_name,
            email=email,
            frequency=frequency,
            sections=json.dumps(sections) if sections else '[]',  # Convert list to JSON string
            tags=json.dumps(tags) if tags else '[]'  # Convert list to JSON string
        )
        subscription.set_frequency(frequency)  # Validate frequency
        subscription.set_sections(sections)  # Validate sections
        subscription.set_tags(tags)  # Validate tags
        db.session.add(subscription)
        db.session.commit()
        return subscription

    @classmethod
    def unsubscribe(cls, email):
        """Remove a subscription by email."""
        subscription = cls.query.filter_by(email=email).first()
        if subscription:
            db.session.delete(subscription)
            db.session.commit()
        else:
            raise ValueError(f"No subscription found with email: {email}")
        return subscription

    def update_preferences(self, sections=None, tags=None, frequency=None):
        """Update subscription preferences."""
        if sections is not None:
            self.set_sections(sections)  # Validate and set sections
        if tags is not None:
            self.set_tags(tags)  # Validate and set tags
        if frequency is not None:
            self.set_frequency(frequency)  # Validate and set frequency
        db.session.commit()

    def set_frequency(self, frequency):
        """Set frequency with validation."""
        if frequency not in self.VALID_FREQUENCIES:
            raise ValueError(f"Invalid frequency: {frequency}. Must be one of {self.VALID_FREQUENCIES}")
        self.frequency = frequency

    def set_sections(self, sections):
        """Set sections with validation."""
        if not isinstance(sections, list):
            raise ValueError("Sections must be a list")
        for section in sections:
            if section not in self.VALID_SECTIONS:
                raise ValueError(f"Invalid section: {section}. Must be one of {self.VALID_SECTIONS}")
        self.sections = json.dumps(sections)

    def set_tags(self, tags):
        """Set tags with validation."""
        if not isinstance(tags, list):
            raise ValueError("Tags must be a list")
        self.tags = json.dumps(tags)