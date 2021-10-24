from flask import Blueprint, request, jsonify
import json
from flask_login import login_required, current_user
from app.api.auth_routes import login
from app.models import User, Post, Image, db
from ..forms import CommentForm

comment_routes = Blueprint("comments", __name__)


@comment_routes.route('/', methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    # print(dir(request))
    print("eggs", request.form["content"])
    # print("form", form.data)
    # comment_data = json.loads(request.form)
    # comment_data = request.form["new_comment"]
    # comment_data = json.loads(request.form["new_comment"])
    # print("comment_data", comment_data)
    # print(json.loads(request.form["new_comment"]))
    # print(comment_data)

    return "nana"
