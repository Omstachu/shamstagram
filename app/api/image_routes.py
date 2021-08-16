from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods=["POST"])
@login_required
def image_upload():
    image = form
    return {'users': [user.to_dict() for user in users]}


