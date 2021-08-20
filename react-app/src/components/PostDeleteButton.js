import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { erasePost } from "../store/post";

const PostDeleteButton = ({ post }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(erasePost(post));
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default PostDeleteButton;
