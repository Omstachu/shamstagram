import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { createPost, getOnePost } from "../store/post";
import PostDeleteButton from "./PostDeleteButton";
import PostEditForm from "./PostEditForm";

function Post(propPostId) {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [username, setUsername] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [editButtonDisplay, setEditButtonDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  let { postId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  if (!postId) {
    postId = propPostId.postId;
  }

  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   if (!post[postId]) {
  //     console.log("this is the post at postID >>>>>>>>>>", post[postId]);
  //     history.push("/");
  //   }
  // }, [postId]);

  useEffect(() => {
    dispatch(getOnePost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setDescription(post[postId]?.description);
    setImageUrl(post[postId]?.image_url);
    setUsername(post[postId]?.username);
    setAltText(post[postId]?.alt_text);
    if (user.id === post[postId]?.userId) {
      setDeleteDisplay(true);
      setEditButtonDisplay(true);
    }
  }, [post, postId]);

  let editContent = null;

  if (editDisplay) {
    editContent = (
      <PostEditForm
        post={post[postId]}
        hideForm={() => setEditDisplay(false)}
      />
    );
  }

  let editButton = null;

  if (editButtonDisplay) {
    editButton = <button onClick={() => setEditDisplay(true)}>Edit </button>;
  }

  let deleteContent = null;

  if (deleteDisplay) {
    console.log("THIS IS A POST----", post);
    deleteContent = <PostDeleteButton post={post[postId]} />;
  }

  return (
    <>
      <div className="post-container__container">
        <div className="post-container">
          <div className="post-username">{username}</div>
          <div className="post-image__container">
            <img className="post-image" src={imageUrl} alt={altText}></img>
          </div>
          {editButton}
          <div className="post-description">{description}</div>
          {editContent}
          {deleteContent}
        </div>
      </div>
    </>
  );
}

export default Post;
