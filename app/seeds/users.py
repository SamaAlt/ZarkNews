from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash
from sqlalchemy.sql import text  

# Adds a demo user, you can add other users here if you want
def seed_users():
    try:
        # Creating demo users with hashed passwords
        demo = User(
            first_name='Demo',
            last_name='User',
            email='demo@zarknews.com',
            password_hash=generate_password_hash('StrongPassword1'),
            role='editor',
        )
        amy = User(
            first_name='Amy',
            last_name='Dunder',
            email='amy@zarknews.com',
            password_hash=generate_password_hash('StrongPassword2'),
            role='editor',
        )
        jack = User(
            first_name='Jack',
            last_name='Waters',
            email='jack@zarknews.com',
            password_hash=generate_password_hash('StrongPassword3'),
            role='editor',
        )
        jill = User(
            first_name='Jill',
            last_name='Waters',
            email='jill@zarknews.com',
            password_hash=generate_password_hash('StrongPassword4'),
            role='editor',
        )

        # Add users to the session
        db.session.add(demo)
        db.session.add(amy)
        db.session.add(jack)
        db.session.add(jill)
        
        db.session.commit()
        print("Users have been seeded!")
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