from flask.cli import AppGroup
from .users import seed_users, undo_users
from .articles import seed_articles, undo_articles
from .subscriptions import seed_subscriptions, undo_subscriptions
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_articles()
    seed_subscriptions()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()  # If you want to undo user seeding, keep this
    # Add other undo functions here
    undo_articles()
    undo_subscriptions()
