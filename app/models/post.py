from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    imageId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(140))

    def to_dict(self):
        return {
            "id": self.id,
            "imageId": self.imageId,
            "userId": self.userId,
            "description" : self.description
        }
