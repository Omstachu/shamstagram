import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createPost, getOnePost } from "../../store/post";
import PostEditForm from "../PostEditForm";
import './Post.css'
// import { PostDeleteButton } from "./PostDeleteButton";

function Post(propPostId) {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [username, setUsername] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [deleteDisplay, setDeleteDisplay] = useState(false);
  let { postId } = useParams();


  const dispatch = useDispatch();

  if (!postId) {
    postId = propPostId.postId;
  }
  const user = useSelector((state) => state.session);
  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getOnePost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setDescription(post[postId]?.description);
    setImageUrl(post[postId]?.image_url);
    setUsername(post[postId]?.username);
    setAltText(post[postId]?.alt_text);
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

  let deleteContent = null
    if (deleteDisplay && post[postId]?.userId == user.id){
      deleteContent = (<button > delete </button>)
    }

  return (
    <>
      <div className="post-container__container">
        <div className="post-container">
          <div className="post-username">{username}</div>
          <div className="post-image__container">
            <img className="post-image" src={imageUrl} alt={altText}></img>
          </div>
          <button className="post-button edit-description-button" onClick={() => setEditDisplay(true)}>Edit </button>
          <button className="post-button delete-post-button">Delete </button>
          <div className="post-description">{description}</div>
          {editContent}
          {deleteContent}
        </div>
      </div>
    </>
  )
}

export default Post;
