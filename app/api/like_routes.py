from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, Image, db

image_routes = Blueprint('likes', __name__)


@image_routes.route('/', methods=["GET"])
@login_required
def show_image():
    images = Image.query.all()
    return {"images": {image.id: {"url": image.url, "alt_text": image.alt_text} for image in images}}
