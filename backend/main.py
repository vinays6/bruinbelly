from flask import Flask
import os
from extensions import db

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
