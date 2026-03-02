from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy import func
from extensions import db
from models import Item, Menu, MenuItem
app = Flask(__name__)
CORS(app)

# Database configuration (defaults to sqlite file `bruinbelly.db` in this folder)
basedir = os.path.abspath(os.path.dirname(__file__))
default_db = 'sqlite:///' + os.path.join(basedir, 'bruinbelly.db')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', default_db)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize shared DB instance with the app
db.init_app(app)

# Import models so they're registered with SQLAlchemy
# Import inside the app context after `db` is initialized to avoid circular imports
try:
    with app.app_context():
        from models import User, Restaurant, Review  # noqa: F401
except Exception as e:
    print(e)
    # If models can't be imported (for example during initial setup), continue
    print("Models weren't initialized - was database setup?")
    pass

@app.route("/")
def hello_world():
    return f"<p>Hello, World! users: {User.query.all()}</p>"

@app.route("/create-user", methods=['POST'])
def create_user():
    user = User(username=request.form['username'], email=request.form['email'], password=request.form['password'])
    db.session.add(user)
    db.session.commit()

    return '', 200

@app.route("/auth", methods=['POST'])
def auth():
    user = User.get(username=request.form['username'])
    return user.password == request.form['password']


@app.route("/create-review", methods=['POST'])
def create_review():
    # rating and user_id are required; others are optional
    # read binary image file if provided
    img = request.files.get('image')

    review = Review(
        rating=int(request.form['rating']),
        comment=request.form.get('comment'),
        image_data=img,
        user_id=int(request.form['user_id']),
        restaurant_id=request.form.get('restaurant_id') and int(request.form['restaurant_id']),
        item_id=request.form.get('item_id') and int(request.form['item_id'])
    )
    db.session.add(review)
    db.session.commit()
    return '', 200

@app.route("/restaurant-id/<string:restaurant_name>", methods=['GET'])
def get_restaurant_id(restaurant_name):
    """
    Retrieve the restaurant ID by its name.
    """
    try:
        # Get the restaurant name from query parameters
        if not restaurant_name:
            return jsonify({"error": "Restaurant name is required"}), 400

        # Query the restaurant by name
        restaurant = Restaurant.query.filter_by(name=restaurant_name).first()
        if not restaurant:
            return jsonify({"error": "Restaurant not found"}), 404

        # Return the restaurant ID
        return jsonify({"id": restaurant.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/restaurant/<int:restaurant_id>/reviews", methods=['GET'])
def get_reviews_for_restaurant(restaurant_id):
    """
    Retrieve all reviews for a specific restaurant.
    """
    try:
        # Query the restaurant to ensure it exists
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            return jsonify({"error": "Restaurant not found"}), 404

        # Query all reviews for the restaurant
        reviews = Review.query.filter_by(restaurant_id=restaurant_id).all()

        # Serialize the reviews
        reviews_data = []
        for review in reviews:
            reviews_data.append({
                "id": review.id,
                "rating": review.rating,
                "comment": review.comment,
                "image_data": review.image_data,
                "user_id": review.user_id,
                "restaurant_id": review.restaurant_id,
                "item_id": review.item_id,
            })

        return jsonify(reviews_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/restaurant/<int:restaurant_id>/items-by-meal-period/<string:date>", methods=['GET'])
def get_items_by_meal_period(restaurant_id, date):
    """
    Retrieve all items for each meal period for a specific restaurant.
    """
    try:
        requested_date = request.args.get("date")
        if requested_date:
            menu_date = parse_menu_date(requested_date)
            if menu_date is None:
                return jsonify({"error": "Invalid date format. Use YYYYMMDD or YYYY-MM-DD"}), 400
        else:
            menu_date = datetime.now(ZoneInfo("America/Los_Angeles")).date()
        menu_date_key = menu_date.strftime("%Y%m%d")

        # Query the restaurant to ensure it exists
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            return jsonify({"error": "Restaurant not found"}), 404

        # Query all items for the restaurant grouped by meal period
        menu_items = (
            db.session.query(MenuItem)
            .join(Menu)
            .filter(Menu.restaurant_id == restaurant_id)
            .filter(func.strftime("%Y%m%d", MenuItem.date) == menu_date_key)
            .all()
        )
        print(f"[menu] restaurant={restaurant_id} date={menu_date_key} rows={len(menu_items)}")

        # Group items by meal period
        items_by_meal_period = {}
        for menu_item in menu_items:
            meal_period = menu_item.meal_time.value  # Enum value as string
            if meal_period not in items_by_meal_period:
                items_by_meal_period[meal_period] = []
            items_by_meal_period[meal_period].append({
                "id": menu_item.item.id,
                "name": menu_item.item.name,
                "date": menu_item.date.isoformat(),
                "vegetarian": menu_item.item.vegetarian,
                "soy": menu_item.item.soy,
                "gluten": menu_item.item.gluten,
                "wheat": menu_item.item.wheat,
                "dairy": menu_item.item.dairy,
                "vegan": menu_item.item.vegan,
                "low_carbon": menu_item.item.low_carbon,
                "egg": menu_item.item.egg,
                "sesame": menu_item.item.sesame,
                "halal": menu_item.item.halal,
                "tree_nuts": menu_item.item.tree_nuts,
                "high_carbon": menu_item.item.high_carbon,
                "fish": menu_item.item.fish,
                "shellfish": menu_item.item.shellfish,
                "alcohol": menu_item.item.alcohol,
                "peanuts": menu_item.item.peanuts,
                # "price": menu_item.item.price if hasattr(menu_item.item, 'price') else None
            })

        return jsonify(items_by_meal_period), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def parse_menu_date(value):
    text = (value or "").strip()
    for fmt in ("%Y%m%d", "%Y-%m-%d"):
        try:
            return datetime.strptime(text, fmt).date()
        except ValueError:
            continue
    return None

if __name__ == '__main__':
    app.run(debug=True)
