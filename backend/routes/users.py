from ..models import *


users = flask.Blueprint('users', __name__)


@users.route('/register/<string:name>/<string:phone>/<int:train_id>')
def register(name, phone, train_id):
    user, created= User.get_or_create(
        name=name,
        phone=phone,
        train=train_id
    )
    user.save()

    return flask.jsonify("success")
