from app.models import db, Subscription, environment, SCHEMA
from datetime import datetime
import json
from sqlalchemy.sql import text  

# Adds demo subscriptions
def seed_subscriptions():
    try:
        # List of subscriptions to seed
        subscriptions_to_seed = [
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "frequency": "Daily",
                "sections": json.dumps(["technology", "business"]),
                "tags": json.dumps(["AI", "startups"]),
                "subscribed_at": datetime.utcnow(),
            },
            {
                "first_name": "Jane",
                "last_name": "Smith",
                "email": "jane.smith@example.com",
                "frequency": "Weekly",
                "sections": json.dumps(["national", "sports"]),
                "tags": json.dumps(["football", "politics"]),
                "subscribed_at": datetime.utcnow(),
            },
            {
                "first_name": "Alice",
                "last_name": "Johnson",
                "email": "alice.johnson@example.com",
                "frequency": "Monthly",
                "sections": json.dumps(["entertainment", "world"]),
                "tags": json.dumps(["movies", "travel"]),
                "subscribed_at": datetime.utcnow(),
            },
        ]

        # Track how many subscriptions were added
        subscriptions_added = 0

        for sub_data in subscriptions_to_seed:
            # Check if the subscription already exists
            existing_sub = Subscription.query.filter_by(email=sub_data["email"]).first()
            if not existing_sub:
                # Create and add the subscription if it doesn't exist
                sub = Subscription(**sub_data)
                db.session.add(sub)
                subscriptions_added += 1

        # Commit the session
        db.session.commit()
        print(f"Seeded {subscriptions_added} subscriptions. Skipped {len(subscriptions_to_seed) - subscriptions_added} existing subscriptions.")
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