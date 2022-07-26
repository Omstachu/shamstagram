from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.models import User, Post, Like, db

like_routes = Blueprint('likes', __name__)


@like_routes.route('/', methods=["POST"])
@login_required
def add_like():
    userId = request.form["userId"]
    postId = request.form["postId"]

    like = Like(
        postId = postId,
        userId = userId
    )

    db.session.add(like)
    db.session.flush()
    db.session.refresh(like)
    db.session.commit()

    likeReturn = {"postId": postId, "userId": userId}

    return likeReturn

@like_routes.route('/<int:userId>/<int:postId>')
@login_required
def get_one_like(user_id, post_id):
    like = db.session.query(Like).filter_by(userId=user_id).filter_by(postId=post_id)

    likeDict = {like.id: like.to_dict()}

    return likeDict
