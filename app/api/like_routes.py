from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.models import User, Post, Like, db

like_routes = Blueprint('likes', __name__)


@like_routes.route('/', methods=["POST"])
@login_required
def add_like():
    like_data = json.loads(request.form["new_like"])

    like = Like(
        postId = like_data["postId"],
        userId = like_data["userId"]
    )

    db.session.add(like)
    db.session.flush()
    db.session.refresh(like)
    db.session.commit()

    return like
