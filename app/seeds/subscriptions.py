from app.models import db, Subscription, environment, SCHEMA
from datetime import datetime
import json
from sqlalchemy.sql import text  


# Adds demo subscriptions
def seed_subscriptions():
    try:
        # Creating demo subscriptions
        sub1 = Subscription(
            first_name='John',
            last_name='Doe',
            email='john.doe@example.com',
            frequency='Daily',
            sections=json.dumps(['technology', 'business']),
            tags=json.dumps(['AI', 'startups']),
            subscribed_at=datetime.utcnow()
        )

        sub2 = Subscription(
            first_name='Jane',
            last_name='Smith',
            email='jane.smith@example.com',
            frequency='Weekly',
            sections=json.dumps(['national', 'sports']),
            tags=json.dumps(['football', 'politics']),
            subscribed_at=datetime.utcnow()
        )

        sub3 = Subscription(
            first_name='Alice',
            last_name='Johnson',
            email='alice.johnson@example.com',
            frequency='Monthly',
            sections=json.dumps(['entertainment', 'world']),
            tags=json.dumps(['movies', 'travel']),
            subscribed_at=datetime.utcnow()
        )

        # Add subscriptions to the session
        db.session.add(sub1)
        db.session.add(sub2)
        db.session.add(sub3)

        db.session.commit()
        print("Subscriptions have been seeded!")
    except Exception as e:
        db.session.rollback()  # Rolls back the transaction on failure
        print(f"Error seeding subscriptions: {e}")

def undo_subscriptions():
    try:
        if environment == "production":
            # Use text() to wrap the raw SQL query
            db.session.execute(text(f"TRUNCATE TABLE {SCHEMA}.subscriptions RESTART IDENTITY CASCADE;"))
        else:
            # Use text() to wrap the raw SQL query
            db.session.execute(text("DELETE FROM subscriptions"))

        db.session.commit()
        print("Subscriptions have been removed!")
    except Exception as e:
        db.session.rollback()  # Rolls back the transaction on failure
        print(f"Error undoing subscriptions seed: {e}")