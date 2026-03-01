from extensions import db
import enum
from sqlalchemy import Enum, CheckConstraint


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    reviews = db.relationship(
        'Review',
        back_populates='user',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<User {self.username}>"


class Restaurant(db.Model):
    __tablename__ = 'restaurant'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    address = db.Column(db.String(255))

    reviews = db.relationship(
        'Review',
        back_populates='restaurant',
        cascade='all, delete-orphan'
    )

    menu = db.relationship(
        'Menu',
        back_populates='restaurant',
        uselist=False,
        cascade='all, delete-orphan'
    )

    items = db.relationship(
        'Item',
        back_populates='restaurant',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Restaurant {self.name}>"


class MealTime(enum.Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    LATENIGHT = "latenight"
    ALLDAY = "allday"


class Menu(db.Model):
    __tablename__ = 'menu'

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(
        db.Integer,
        db.ForeignKey('restaurant.id'),
        nullable=False  # FIXED
    )

    restaurant = db.relationship(
        'Restaurant',
        back_populates='menu'
    )

    menu_items = db.relationship(
        'MenuItem',
        back_populates='menu',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Menu {self.id} restaurant={self.restaurant_id}>"


class MenuItem(db.Model):
    __tablename__ = 'menu_item'

    id = db.Column(db.Integer, primary_key=True)

    menu_id = db.Column(
        db.Integer,
        db.ForeignKey('menu.id'),
        nullable=False
    )

    item_id = db.Column(
        db.Integer,
        db.ForeignKey('item.id'),
        nullable=False
    )

    meal_time = db.Column(
        Enum(MealTime, name="meal_time_enum"),  # FIXED
        nullable=False
    )
    date = db.Column(db.Date, nullable=False)

    menu = db.relationship('Menu', back_populates='menu_items')
    item = db.relationship('Item', back_populates='menu_items')

    def __repr__(self):
        return (
            f"<MenuItem menu={self.menu_id} item={self.item_id} "
            f"time={self.meal_time.value}>"
        )


class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)

    restaurant_id = db.Column(
        db.Integer,
        db.ForeignKey('restaurant.id'),
        nullable=False  # FIXED
    )

    name = db.Column(db.Text, nullable=False)

    # dietary flags (fine for hackathon)
    vegetarian = db.Column(db.Boolean, default=False)
    soy = db.Column(db.Boolean, default=False)
    gluten = db.Column(db.Boolean, default=False)
    wheat = db.Column(db.Boolean, default=False)
    dairy = db.Column(db.Boolean, default=False)
    vegan = db.Column(db.Boolean, default=False)
    low_carbon = db.Column(db.Boolean, default=False)
    eggs = db.Column(db.Boolean, default=False)
    sesame = db.Column(db.Boolean, default=False)
    halal = db.Column(db.Boolean, default=False)
    tree_nuts = db.Column(db.Boolean, default=False)
    high_carbon = db.Column(db.Boolean, default=False)
    fish = db.Column(db.Boolean, default=False)
    shellfish = db.Column(db.Boolean, default=False)
    alcohol = db.Column(db.Boolean, default=False)
    peanut = db.Column(db.Boolean, default=False)

    restaurant = db.relationship(
        'Restaurant',
        back_populates='items'
    )

    menu_items = db.relationship(
        'MenuItem',
        back_populates='item',
        cascade='all, delete-orphan'
    )

    reviews = db.relationship(
        'Review',
        back_populates='item',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Item {self.name}>"


class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    image_data = db.Column(db.LargeBinary)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id'),
        nullable=False
    )

    restaurant_id = db.Column(
        db.Integer,
        db.ForeignKey('restaurant.id'),
        nullable=True
    )

    item_id = db.Column(
        db.Integer,
        db.ForeignKey('item.id'),
        nullable=True
    )

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')
    item = db.relationship('Item', back_populates='reviews')

    def __repr__(self):
        has_image = bool(self.image_data)
        return (
            f"<Review {self.id} rating={self.rating} "
            f"image={'yes' if has_image else 'no'}>"
        )