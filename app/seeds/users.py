from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text  

# Adds a demo user, you can add other users here if you want
def seed_users():
    try:
        # List of users to seed
        users_to_seed = [
            {
                "first_name": "Demo",
                "last_name": "User",
                "email": "demo@zarknews.com",
                "password_hash": generate_password_hash('StrongPassword1'),
                "role": "editor",
            },
            {
                "first_name": "Amy",
                "last_name": "Dunder",
                "email": "amy@zarknews.com",
                "password_hash": generate_password_hash('StrongPassword2'),
                "role": "editor",
            },
            {
                "first_name": "Jack",
                "last_name": "Waters",
                "email": "jack@zarknews.com",
                "password_hash": generate_password_hash('StrongPassword3'),
                "role": "editor",
            },
            {
                "first_name": "Jill",
                "last_name": "Waters",
                "email": "jill@zarknews.com",
                "password_hash": generate_password_hash('StrongPassword4'),
                "role": "editor",
            },
        ]

        # Track how many users were added
        users_added = 0

        for user_data in users_to_seed:
            # Check if the user already exists
            existing_user = User.query.filter_by(email=user_data["email"]).first()
            if not existing_user:
                # Create and add the user if they don't exist
                user = User(**user_data)
                db.session.add(user)
                users_added += 1

        # Commit the session
        db.session.commit()
        print(f"Seeded {users_added} users. Skipped {len(users_to_seed) - users_added} existing users.")
    except Exception as e:
        db.session.rollback()  # Rolls back the transaction on failure
        print(f"Error seeding users: {e}")


def undo_users():
    try:
        if environment == "production":
            # Use text() to wrap the raw SQL query
            db.session.execute(text(f"TRUNCATE TABLE {SCHEMA}.users RESTART IDENTITY CASCADE;"))
        else:
            # Use text() to wrap the raw SQL query
            db.session.execute(text("DELETE FROM users"))

        db.session.commit()
        print("Users have been removed!")
    except Exception as e:
        db.session.rollback()  # Rolls back the transaction on failure
        print(f"Error undoing user seed: {e}")