from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.api.auth_routes import login
from app.models import Comment, db
from ..forms import CommentForm

comment_routes = Blueprint("comments", __name__)


# @comment_routes.route('/<int:pageId>')
@comment_routes.route('/')
@login_required
def get_post_comments():
    comments = db.session.query(Comment).all()
    commentsDict = {comment.id: comment.to_dict() for comment in comments}
    print(commentsDict)
    return commentsDict


@comment_routes.route('/', methods=["POST"])
@login_required
def new_comment():
    comment = Comment(
        userId=request.form["userId"],
        postId=request.form["postId"],
        content=request.form["content"]
    )

    db.session.add(comment)
    db.session.flush()
    db.session.refresh(comment)
    db.session.commit()

    comment = {
        "id": comment.id,
        "userId": comment.userId,
        "postId": comment.postId,
        "content": comment.content
    }

    return comment
