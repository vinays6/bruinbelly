from flask_sqlalchemy import SQLAlchemy

# Central SQLAlchemy instance to avoid circular imports
db = SQLAlchemy()
