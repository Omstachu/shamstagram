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
