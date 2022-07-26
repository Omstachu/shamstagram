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
def get_one_like(userId, postId):
    likes = db.session.query(Like).filter_by(userId=userId).filter_by(postId=postId)

    likeDict = {"like": like.to_dict() for like in likes}

    return likeDict

@like_routes.route('/<int:id>/delete', methods=["POST"])
@login_required
def delete_one_like(id):
    like = Like.query.get(id)

    db.session.delete(like)
    db.session.commit()


    return {'Success': id}
