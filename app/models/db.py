from flask_sqlalchemy import SQLAlchemy

import os
environment = os.getenv("FLASK_DEBUG") 
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

# Helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "0":  # Production mode
        return f"{SCHEMA}.{attr}"
    else:
        return attr
