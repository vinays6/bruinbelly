from main import app
from extensions import db
import json
from models import Item, MealTime, Restaurant, Review, MenuItem, Menu, User
from extensions import db
from datetime import datetime

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
    with app.app_context():
        with open('scrapemenu.json') as f:
            data = json.load(f)

        for place_name, dates in data.items():

            # 1. Create or get restaurant
            restaurant = Restaurant.query.filter_by(name=place_name).first()
            if not restaurant:
                restaurant = Restaurant(name=place_name)
                db.session.add(restaurant)
                db.session.flush()  # get ID

            # 2. Ensure restaurant has a menu
            if not restaurant.menu:
                menu = Menu(restaurant=restaurant)
                db.session.add(menu)
                db.session.flush()
            else:
                menu = restaurant.menu

            # 3. Iterate dates
            for menu_date, items in dates.items():
                for item_data in items:
                    item_name = item_data.get("name")
                    meal_time_str = item_data.get("time", "allday")

                    # 4. Convert string → Enum safely
                    try:
                        meal_time = MealTime(meal_time_str)
                    except ValueError:
                        meal_time = MealTime.ALLDAY
                    
                    format_string = "%Y-%m-%d"
                    date_time = datetime.strptime(menu_date, format_string)

                    # 5. Create or get item
                    item = Item.query.filter_by(
                        name=item_name,
                        restaurant_id=restaurant.id
                    ).first()

                    if not item:
                        item = Item(
                            name=item_name,
                            restaurant=restaurant
                        )
                        db.session.add(item)
                        db.session.flush()

                    # 6. Link via MenuItem (avoid duplicates)
                    exists = MenuItem.query.filter_by(
                        menu_id=menu.id,
                        item_id=item.id,
                        meal_time=meal_time,
                        date=date_time
                    ).first()

                    if not exists:
                        menu_item = MenuItem(
                            menu=menu,
                            item=item,
                            meal_time=meal_time,
                            date=date_time
                        )
                        db.session.add(menu_item)

        db.session.commit() 
        print("Initialized everything to db")


def dump_db():
    with app.app_context():

        print("\n================ USERS ================")
        for user in User.query.all():
            print(f"[User {user.id}] {user.username} ({user.email})")

            if not user.reviews:
                print("  No reviews")
            for review in user.reviews:
                if review.restaurant:
                    target = f"Restaurant: {review.restaurant.name}"
                else:
                    target = f"Item: {review.item.name}"

                print(
                    f"  Review {review.id} | rating={review.rating} | {target}"
                )

        print("\n================ RESTAURANTS ================")
        for r in Restaurant.query.all():
            print(f"[Restaurant {r.id}] {r.name}")
            if r.address:
                print(f"  Address: {r.address}")

            # Menu + MenuItems
            if r.menu:
                print(f"  Menu {r.menu.id}")
                if not r.menu.menu_items:
                    print("    (no menu items)")
                for mi in r.menu.menu_items:
                    print(
                        f"    [{mi.date}] {mi.item.name} "
                        f"({mi.meal_time.value})"
                    )
            else:
                print("  No menu")

            # Items
            print("  Items:")
            if not r.items:
                print("    (none)")
            for item in r.items:
                print(f"    [{item.id}] {item.name}")

        print("\n================ ITEMS ================")
        for item in Item.query.all():
            print(
                f"[Item {item.id}] {item.name} "
                f"(Restaurant: {item.restaurant.name})"
            )

            # Menu appearances
            if item.menu_items:
                print("  Appears in:")
                for mi in item.menu_items:
                    print(
                        f"    Menu {mi.menu_id} | "
                        f"{mi.meal_time.value} | {mi.date}"
                    )

            # Reviews
            if item.reviews:
                print("  Reviews:")
                for r in item.reviews:
                    print(f"    Review {r.id} rating={r.rating}")

        print("\n================ MENUS ================")
        for menu in Menu.query.all():
            print(
                f"[Menu {menu.id}] Restaurant: {menu.restaurant.name}"
            )

            if not menu.menu_items:
                print("  (empty)")
            for mi in menu.menu_items:
                print(
                    f"  {mi.item.name} | {mi.meal_time.value} | {mi.date}"
                )

        print("\n================ REVIEWS ================")
        for review in Review.query.all():
            if review.restaurant:
                target = f"Restaurant: {review.restaurant.name}"
            else:
                target = f"Item: {review.item.name}"

            print(
                f"[Review {review.id}] rating={review.rating} "
                f"user={review.user.username} "
                f"target={target} "
                f"image={'yes' if review.image_data else 'no'}"
            )

if __name__ == '__main__':
    create_database()
    initialize_db()
    # set this to True to print out everything
    if True:
        dump_db()