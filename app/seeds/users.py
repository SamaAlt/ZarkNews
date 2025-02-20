from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash

# Adds a demo user, you can add other users here if you want
def seed_users():
    # Creating demo users with hashed passwords
    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@zarknews.com',
        password_hash=generate_password_hash('StrongPassword1'),  # Hash the password
        role='editor',
    )
    amy = User(
        first_name='Amy',
        last_name='Dunder',
        email='amy@zarknews.com',
        password_hash=generate_password_hash('StrongPassword2'),  # Hash the password
        role='editor',
    )
    jack = User(
        first_name='Jack',
        last_name='Waters',
        email='jack@zarknews.com',
        password_hash=generate_password_hash('StrongPassword3'),  # Hash the password
        role='editor',
    )

    # Add users to the session
    db.session.add(demo)  
    db.session.add(amy)
    db.session.add(jack)
    
    db.session.commit()
    print("Users have been seeded!")


# Undo the user seeding (clears the users table)
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
