from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.models import User, Post, Image, db
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/', methods=["POST"])
@login_required
def new_post():
    form = PostForm()

    post_data = json.loads(request.form["new_post"])

    post = Post(
        imageId=post_data["imageId"],
        userId=post_data["userId"],
        description=post_data["description"]
    )
    db.session.add(post)
    db.session.flush()
    db.session.refresh(post)
    db.session.commit()

    post = {"id": post.id,
            "imageId": post.imageId,
            "userId": post.userId,
            "description": post.description
            }
    return post

@post_routes.route('/')
@login_required
def get_all_posts():
    posts = db.session.query(Post).join(User, Image).all()

    postDict = {post.id: post.to_dict() for post in posts}

    return postDict

@post_routes.route('/<int:pageId>')
@login_required
def get_post(pageId):
    posts = db.session.query(Post).join(User, Image).all()
    postDict = {post.id: post.to_dict() for post in posts}
    return postDict


@post_routes.route('/<int:id>/delete', methods=["POST"])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if current_user.id == post.userId:
        db.session.delete(post)
        db.session.commit()
        return {'Success': id}

    return {'Fail': "This is not your post"}

@post_routes.route('/<int:id>/edit', methods=["POST"])
@login_required
def edit_post(id):
    postId = request.form["postId"]
    description = request.form["description"]
    # post form should be modified to editForm
    post = Post.query.get(postId)
    post.description = description
    db.session.commit()
    return {'Success': 'Success!'}
