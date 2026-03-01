from main import app
from extensions import db


def create_database():
    with app.app_context():
        # import models to ensure tables are registered with SQLAlchemy
        import models  # noqa: F401
        db.create_all()
        print('Database created at', app.config['SQLALCHEMY_DATABASE_URI'])


if __name__ == '__main__':
    create_database()
