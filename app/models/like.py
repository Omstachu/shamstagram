from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, ForeignKey("posts.id"), nullable=False)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)

    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "postId": self.postId,
            "userId": self.userId,
        }
