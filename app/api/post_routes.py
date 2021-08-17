from flask import Blueprint, request, jsonify
import json
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
    # data = [file for file in request.files]
    post_data = json.loads(request.form["new_post"])
    # print("request >>>>>>>>>>>>>>>>>>>>>>>", request.form["new_post"])
    # print("request >>>>>>>>>>>>>>>>>>>>>>>", post_data)
    # # print("request >>>>>>>>>>>>>>>>>>>>>>>",request.form["imageId"])
    # # print("request >>>>>>>>>>>>>>>>>>>>>>>",request.form["userId"])
    # # print("request >>>>>>>>>>>>>>>>>>>>>>>",request.form["description"])
    # print("Data >>>>>>>>>>>>>>>>>>>>>>>", data)

    post = Post(
        imageId=post_data["imageId"],
        userId=post_data["userId"],
        description=post_data["description"]
    )
    # print("POST DATA ----------", post)
    db.session.add(post)
    db.session.commit()

    return post_data
