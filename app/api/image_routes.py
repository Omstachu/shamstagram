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

    print(new_image.id, "****************************************")

    db.session.add(new_image)
    db.session.flush()
    db.session.refresh(new_image)
    db.session.commit()

    new_image = {"id": new_image.id,
                 "alt_text": new_image.alt_text, "url": new_image.url}

    return new_image

@image_routes.route('/', methods=["GET"])
@login_required
def show_image():
    images = Image.query.all()
    return {"images": {image.id: {"url": image.url, "alt_text": image.alt_text} for image in images}}
