# Shamstagram

Shamstagram is a website where users can post fake images about their fake life to their fake friends.

This project was created by Brandon Simpson, Serge Kassangana, Nate Bernier, and Peter Mace
## Technologies

### Frontend

#### React
#### Redux

### Backend
#### Flask
#### Postgres
#### Sqlalchemy
#### AWS S3

### Code snippets
#### React S3 component react-app/src/components/PostForm/index.js

This is a simple html form with a file upload that call the createPost thunk.
```
const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPost(user, description, image));
    if (res.data === undefined){
      setErrors(["You must enter an image format, jpg, jpeg, png, gif"])
      return;
    }
    history.push(`/posts/${res.data.id}`);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateDescription = (e) => {
    const description = e.target.value;
    setDescription(description);

  };

  return (
    <div className="create-post-container">
      <form className="create-post-form-container" onSubmit={handleSubmit}>
        {errors.map((error, ind) => (
            <div className="login-errors" key={ind}>
              {error}
            </div>
          ))}
        <input
          className="file-upload-input"
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={updateImage}
        />...
```

#### AWS Redux thunk react-app/src/store
This thunk takes the images, converts it to json and sends it to the images api backend route.
```
export const uploadImage = (picture) => async (dispatch) => {
  const response = await fetch('/api/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        picture
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(addImage(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}
```


#### Back End Route app/api/image_routes.py
This route generates a new unique filename, stores the image using that file name, and then stores the corresponding S3 bucket url.

```@image_routes.route('/', methods=["POST"])
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
    db.session.flush()
    db.session.refresh(new_image)
    db.session.commit()

    new_image = {"id": new_image.id,
                 "alt_text": new_image.alt_text, "url": new_image.url}

    return new_image
```

## Wiki 

#### For more detailed development information(API, Database, User Stories, Feature List, and Deployment guide), visit our [wiki](https://github.com/Omstachu/shamstagram/wiki)
