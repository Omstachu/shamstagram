from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, Post, db
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["POST"])
@login_required
def new_post():
    form = PostForm()
    # print(form)
    post = Post({
        "imageId": request.imageData.id,
        "userId": current_user.id,
        "description": form.description.data
    }
    )
    db.session.add(post)
    db.session.commit()

    return {"post": post}
