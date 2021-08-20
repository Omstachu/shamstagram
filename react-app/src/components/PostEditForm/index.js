import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../store/post";
import "./PostEditForm.css";

const PostEditForm = ({ post, hideForm }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(post?.description);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    post.description = description;
    await dispatch(editPost(post));
    hideForm();
  };

  const updateDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="edit-form-input"
        placeholder="Description"
        type="text"
        value={description}
        onChange={updateDescription}
        maxLength="140"
      />
      <button className="post-button edit-submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PostEditForm;
