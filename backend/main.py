import flask
import flask_cors
import logging


app = flask.Flask(__name__)
flask_cors.CORS(app)

from . import models
from .routes import rooms
from .routes import users


app.register_blueprint(rooms.rooms, url_prefix='/rooms')
app.register_blueprint(users.users, url_prefix='/users')


@app.before_request
def open_db():
    flask.g.db = models.db
    flask.g.db.connect()

    # Create tables and initial user
    flask.g.db.create_tables([models.User, models.Room, models.Event])


@app.after_request
def close_db(response):
    flask.g.db.close()
    return response
