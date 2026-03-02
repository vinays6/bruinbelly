from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from zoneinfo import ZoneInfo
from sqlalchemy import func
from extensions import db
from models import Item, Menu, MenuItem, Review, Restaurant, User
app = Flask(__name__)
CORS(app)

# Database configuration (defaults to sqlite file `bruinbelly.db` in this folder)
basedir = os.path.abspath(os.path.dirname(__file__))
default_db = 'sqlite:///' + os.path.join(basedir, 'bruinbelly.db')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', default_db)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize shared DB instance with the app
db.init_app(app)

@app.route("/")
def hello_world():
    return f"<p>Hello, World! users: {User.query.all()}</p>"

@app.route("/create-user", methods=['POST'])
def create_user():
    username = request.form.get('username')
    email = request.form.get('email')
    if not username or not email:
        return jsonify({"error": "username and email are required"}), 400

    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()

    return jsonify({"id": user.id}), 200

@app.route("/auth", methods=['POST'])
def auth():
    username = request.form.get('username')
    if not username:
        return jsonify({"error": "username is required"}), 400
    user = User.query.filter_by(username=username).first()
    return jsonify({"authenticated": bool(user)}), 200


@app.route("/create-review", methods=['POST'])
def create_review():
    """
    Create a review for an item/restaurant. Supports JSON and form-encoded input.
    """
    try:
        payload = request.get_json(silent=True) if request.is_json else request.form

        rating_raw = payload.get('rating') if payload else None
        if rating_raw is None:
            return jsonify({"error": "rating is required"}), 400

        try:
            rating = float(rating_raw)
        except (TypeError, ValueError):
            return jsonify({"error": "rating must be a number"}), 400

        if rating < 0 or rating > 5:
            return jsonify({"error": "rating must be between 0 and 5"}), 400

        item_id_raw = payload.get('item_id') if payload else None
        restaurant_id_raw = payload.get('restaurant_id') if payload else None
        user_id_raw = payload.get('user_id') if payload else None
        comment = (payload.get('comment') or '').strip() if payload else ''

        item_id = int(item_id_raw) if item_id_raw not in (None, '') else None
        restaurant_id = int(restaurant_id_raw) if restaurant_id_raw not in (None, '') else None

        # Fallback to first user (or create one) so frontend can post reviews without auth.
        if user_id_raw in (None, ''):
            user = get_or_create_default_user()
            user_id = user.id
        else:
            user_id = int(user_id_raw)

        review = None
        if item_id is not None:
            review = (
                Review.query
                .filter_by(user_id=user_id, item_id=item_id)
                .order_by(Review.id.desc())
                .first()
            )

        if review:
            review.rating = rating
            review.comment = comment or None
            review.restaurant_id = restaurant_id
        else:
            review = Review(
                rating=rating,
                comment=comment or None,
                image_data=None,
                user_id=user_id,
                restaurant_id=restaurant_id,
                item_id=item_id,
            )
            db.session.add(review)

        db.session.commit()

        return jsonify(serialize_review(review)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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

        reviews_data = [serialize_review(review) for review in reviews]

        return jsonify(reviews_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/item/<int:item_id>/reviews", methods=['GET'])
def get_reviews_for_item(item_id):
    """
    Retrieve all reviews for a specific item.
    """
    try:
        item = Item.query.get(item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404

        reviews = (
            Review.query
            .filter_by(item_id=item_id)
            .order_by(Review.id.desc())
            .all()
        )

        return jsonify([serialize_review(review) for review in reviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/items/ratings-summary", methods=['POST'])
def get_items_ratings_summary():
    """
    Retrieve average rating, review count, and latest comment for many item IDs.
    """
    try:
        payload = request.get_json(silent=True) or {}
        item_ids_raw = payload.get("item_ids")
        if not isinstance(item_ids_raw, list):
            return jsonify({"error": "item_ids must be a list"}), 400

        item_ids = []
        for raw in item_ids_raw:
            try:
                item_ids.append(int(raw))
            except (TypeError, ValueError):
                continue

        if not item_ids:
            return jsonify({}), 200

        aggregate_rows = (
            db.session.query(
                Review.item_id.label("item_id"),
                func.avg(Review.rating).label("avg_rating"),
                func.count(Review.id).label("reviews_count"),
            )
            .filter(Review.item_id.in_(item_ids))
            .group_by(Review.item_id)
            .all()
        )

        latest_comment_rows = (
            db.session.query(Review.item_id, Review.comment)
            .filter(Review.item_id.in_(item_ids))
            .order_by(Review.item_id.asc(), Review.id.desc())
            .all()
        )

        latest_comment_by_item = {}
        for item_id, comment in latest_comment_rows:
            if item_id not in latest_comment_by_item and comment:
                latest_comment_by_item[item_id] = comment

        result = {}
        for row in aggregate_rows:
            item_id = int(row.item_id)
            result[str(item_id)] = {
                "item_id": item_id,
                "avg_rating": float(row.avg_rating) if row.avg_rating is not None else None,
                "reviews_count": int(row.reviews_count or 0),
                "latest_comment": latest_comment_by_item.get(item_id),
            }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/restaurant/<int:restaurant_id>/items-by-meal-period", methods=['GET'])
def get_items_by_meal_period(restaurant_id):
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


def serialize_review(review):
    return {
        "id": review.id,
        "rating": float(review.rating) if review.rating is not None else None,
        "comment": review.comment,
        "image_data": review.image_data,
        "user_id": review.user_id,
        "restaurant_id": review.restaurant_id,
        "item_id": review.item_id,
    }


def get_or_create_default_user():
    user = User.query.first()
    if user:
        return user

    user = User(
        username='demo_user',
        email='demo_user@bruinbelly.local',
    )
    db.session.add(user)
    db.session.flush()
    return user

if __name__ == '__main__':
    app.run(debug=True)
