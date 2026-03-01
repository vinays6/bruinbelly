from main import app
from extensions import db
import json
from models import Item, Restaurant, Review
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


# load all the data from the scraped data
def initialize_db():
    with app.app_context:
        with open('scrapemenu.json') as f:
            data = json.load(f)
            for place in data.keys():
                db_restaurant = Restaurant(name=place)
                db.session.add(db_restaurant)
                for date in data['place'].keys():
                    for item in data['place']['date']:
                        db_item = Item(restaurant_id = email=request.form['email'])
                        db.session.add(user)
            
            db.session.commit()


if __name__ == '__main__':
    create_database()
    initialize_db()
