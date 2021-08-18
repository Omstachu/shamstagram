import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPost, getOnePost } from "../store/post";

function Post() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const { postId } = useParams();

  const dispatch = useDispatch();

  console.log(postId);

  useEffect(() => {
    dispatch(getOnePost(postId));
    console.log("INSIDE USE EFFECT ---------");
  }, [dispatch]);

  const post = useSelector((state) => state.post);
  console.log("THIS IS THE POST ----------", post[1]?.image_url);

  useEffect(() => {
    setDescription(post[postId]?.description);
    setImageUrl(post[postId]?.image_url);
    setUsername(post[postId]?.user_name);
  });

  return (
    <div className="post-container">
      <div className="post-username">{username}</div>
      <div className="post-image__container">
        <img className="post-image" src={imageUrl}></img>
      </div>
      <div className="post-description">{description}</div>
    </div>
  );
}

export default Post;
