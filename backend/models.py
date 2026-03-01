from extensions import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<User {self.username}>"


class Restaurant(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140), nullable=False)
    address = db.Column(db.String(255))
    reviews = db.relationship('Review', back_populates='restaurant', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Restaurant {self.name}>"

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=True)

    name = db.Column(db.Text)
    vegetarian = db.Column(db.Boolean)
    soy = db.Column(db.Boolean)
    gluten = db.Column(db.Boolean)
    wheat = db.Column(db.Boolean)
    dairy = db.Column(db.Boolean)
    vegan = db.Column(db.Boolean)
    low_carbon = db.Column(db.Boolean)
    eggs = db.Column(db.Boolean)
    sesame = db.Column(db.Boolean)
    halal = db.Column(db.Boolean)
    tree_nuts = db.Column(db.Boolean)
    high_carbon = db.Column(db.Boolean)
    fish = db.Column(db.Boolean)
    shellfish = db.Column(db.Boolean)
    alcohol = db.Column(db.Boolean)
    peanut = db.Column(db.Boolean)

class Review(db.Model):
    __tablename__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    # binary image data stored directly in the database (optional)
    image_data = db.Column(db.LargeBinary, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=True)
    

    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')

    def __repr__(self):
        has_image = bool(self.image_data)
        return f"<Review {self.id} rating={self.rating} image={'yes' if has_image else 'no'}>"
