from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from .post import Post


class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    alt_text = db.Column(db.String(255), nullable=False)

    posts = relationship("Post", order_by=Post.id, back_populates="image", uselist=False)

    def to_dict(self):
        return {
            "id": self.id,
            "url": self.imageId,
            "alt_text": self.userId
        }
