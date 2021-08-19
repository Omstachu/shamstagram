import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { uploadImage } from "../../store/image";
import { createPost, getOnePost } from "../../store/post";
import "./PostForm.css"

const PostForm = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState({ id: 0 });
  const [imageDB, setImageDB] = useState(null);
  const [description, setDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(false);



  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPost(user, description, image));
    console.log(res);
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
        {/* <label for="file-upload">Choose File</label> */}
        <input className="file-upload-input" id="file-upload" type="file" accept="image/*" onChange={updateImage} />
        <input className = "create-post-input"
          placeholder="Description"
          type="text"
          value={description}
          onChange={updateDescription}
          maxLength="140"
          />
        <button className = "create-post-button" type="submit">Submit</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default PostForm;
