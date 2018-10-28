import flask

from ..models import *


rooms = flask.Blueprint('rooms', __name__)


@rooms.route('/invitations/<string:phone>', methods=['GET'])
def list_invitations(phone):
    try:
        user = User.select().where(User.phone == phone).get()
    except User.DoesNotExist:
        return flask.jsonify({"error": f"User '{phone}' does not exist"})

    try:
        invitations = Room.select().where(Room.user_b == user.id and
                                          Room.accepted != True)
    except Room.DoesNotExist:
        return flask.jsonify({"rooms": []})

    return flask.jsonify({"rooms": [room.id for room in invitations]})


@rooms.route('/accept/<int:room_id>/<string:phone>', methods=['PUT'])
def accept(room_id, phone):
    try:
        user = User.select().where(User.phone == phone).get()
    except User.DoesNotExist:
        return flask.jsonify({"error": f"User '{phone}' does not exist"})

    try:
        invitation = (Room.select().join(User, on=(Room.user_b, User.id))
                      .where(Room.user_b != user.id).get())
    except Room.DoesNotExist:
        return flask.jsonify({"error": f"Room '{room_id}' does not exist"})

    invitation.accepted = True
    invitation.save()

    return flask.jsonify("success")

@rooms.route('/invite/<string:other>/<string:phone>', methods=['PUT'])
def invite(other, phone):

    try:
        user = User.select().where(User.phone == phone).get()
    except User.DoesNotExist:
        return flask.jsonify({"error": f"User '{phone}' does not exist"})

    try:
        invited = User.select().where(User.phone == other).get()
    except User.DoesNotExist:
        return flask.jsonify({"error": f"User '{other}' does not exist"})

    room = None
    try:
        room = (Room.select()
                .where(Room.user_a == user.id and Room.user_b == invited.id or
                       Room.user_b == user.id and Room.user_a == invited.id)
                .get())
    except Room.DoesNotExist:
        room = Room(user_a=user.id, user_b=invited.id)
        room.save()

    return flask.jsonify({"room_id": room.id})


@rooms.route('/<int:room_id>/send/<string:kind>/<string:phone>', methods=['PUT'])
def send(room_id, kind, phone):
    if kind not in ('m.text', 'm.image'):
        return flask.jsonify({"error": f"Unknown method '{kind}'"})

    if not flask.request.get_data():
        flask.current_app.logger.error()
        return flask.jsonify({"error": "Must specify a message"})

    json = flask.request.get_json()
    try:
        room = Room.select().where(Room.id == room_id).get()
    except Room.DoesNotExist:
        return flask.jsonify({"error": f"Room '{room_id}' does not exist"})

    try:
        user = User.select().where(User.phone == phone).get()
    except User.DoesNotExist:
        return flask.jsonify({"error": f"User '{phone}' does not exist"})

    if phone not in (room.user_a.phone, room.user_b.phone):
        flask.current_app.logger.error(phone, room.user_a.name, room.user_a.phone, room.user_b.name, room.user_b.phone)
        return flask.jsonify({"error": f"User not in this room"})

    event = Event(content=json, kind=kind, sender=user.id,
                  room=room.id)
    event.save()

    return flask.jsonify("success")


@rooms.route('/<int:room_id>/sync/<int:last_message>', methods=['GET'])
def sync(room_id, last_message):
    flask.current_app.logger.error(room_id)
    flask.current_app.logger.error(last_message)
    flask.current_app.logger.error([e for e in Event.select().dicts()])

    try:
        room = Room.select().where(Room.id == room_id)
    except Room.DoesNotExist:
        return flask.jsonify({"error": f"Room '{room_id}' does not exist"})

    try:
        events = (Event.select()
                  .where(Event.room == room_id)
                  .dicts())
    except Room.DoesNotExist:
        return flask.jsonify({"error": f"Room '{room_id}' does not exist"})

    return flask.jsonify({"events": [event for event in events if
                                     int(event["id"]) > int(last_message)]})
