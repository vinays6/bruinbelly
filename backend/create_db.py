from main import app
from extensions import db


def create_database():
    with app.app_context():
        # import models to ensure tables are registered with SQLAlchemy
        import models  # noqa: F401
        db.create_all()
        print('Database created at', app.config['SQLALCHEMY_DATABASE_URI'])

        # Note: if you change models after the database has already been
        # created (for example adding or renaming columns such as the
        # `image_data` field on Review), you will need to drop the existing
        # database file or use a migration tool such as Flask-Migrate/Alembic.
        # The simplest approach for development is to delete the
        # `bruinbelly.db` file and rerun this script so the schema is rebuilt.


if __name__ == '__main__':
    create_database()
