from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, Image, db
from app.aws_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint('images', __name__)


@image_routes.route('/', methods=["POST"])
@login_required
def image_upload():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    alt_text = image.filename.rsplit('.', 1)[0]
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(url=url, alt_text=alt_text)

    db.session.add(new_image)
    db.session.commit()

    return {"url": url}

    # image = form

    # return {'users': [user.to_dict() for user in users]}
