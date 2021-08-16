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
    # print("request body --------", request.body)
    # print("form --------", form)
    # print("form data --------", form.data)
    # print("request values --------", request.values)
    # print("request get_data --------", request.get_data())
    # print("request get_data --------", dir(request.get_data()))
    data = request.get_json()
    print("data >>>>>>>>>>>>>>>>>>>>>>>", data)
    post = Post(request.body)
    db.session.add(post)
    db.session.commit()

    return {"post": post}
