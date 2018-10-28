import flask
import peewee


db = peewee.SqliteDatabase('trainder.db')


class User(peewee.Model):
    name = peewee.CharField()
    phone = peewee.CharField()
    train = peewee.IntegerField()

    class Meta:
        database = db


class Room(peewee.Model):
    accepted = peewee.BooleanField(default=False)
    user_a = peewee.ForeignKeyField(User)
    user_b = peewee.ForeignKeyField(User)

    class Meta:
        database = db


class Event(peewee.Model):
    content = peewee.TextField()
    kind = peewee.CharField()
    sender = peewee.ForeignKeyField(User)
    room = peewee.ForeignKeyField(Room, backref="room")

    class Meta:
        database = db
