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
    # print("^^^^^^^^^^^^^^^^", like_data)

    like = Like(
        postId = postId,
        userId = userId
    )

    print("like in like_routes")

    db.session.add(like)
    db.session.flush()
    db.session.refresh(like)
    db.session.commit()

    likeReturn = {"postId": postId, "userId": userId}

    return likeReturn
