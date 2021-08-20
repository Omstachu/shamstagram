import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../store/post";
import "./PostForm.css";

const PostForm = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");
  

  const user = useSelector((state) => state.session.user);

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
        />
        <input
          className="create-post-input"
          placeholder="Description"
          type="text"
          value={description}
          onChange={updateDescription}
          maxLength="140"
        />
        <div>Characters Remaining:{140 - description.length}</div>
        <button className="create-post-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
