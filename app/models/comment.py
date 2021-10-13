from .db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


# * Will add functionality to nest comments

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, ForeignKey("posts.id"), nullable=False)
    content = db.Column(db.String(140))

    user = relationship("User", back_populates="comments")
    posts = relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "content": self.content,
        }
