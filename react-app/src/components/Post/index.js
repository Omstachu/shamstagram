import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOnePost } from "../../store/post";
import { createLike, getOneLike, deleteOneLike } from "../../store/like";
import PostDelete from "../PostDelete";
import PostEditForm from "../PostEditForm";
import "./Post.css";

function Post(propPostId) {
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [altText, setAltText] = useState("");
    const [username, setUsername] = useState("");
    const [editDisplay, setEditDisplay] = useState(false);
    const [editButtonDisplay, setEditButtonDisplay] = useState(false);
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likedId, setLikedId] = useState();
    let { postId } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();

    if (!postId) {
        postId = propPostId.postId;
    }

    const post = useSelector((state) => state.post);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!post[postId]) {
            history.push("/");
        }
    }, [history, post, postId]);

    useEffect(async () => {
        dispatch(getOnePost(postId));
        let res = await dispatch(getOneLike(user, postId));
        if (res) {
            setLikedId(res);
            setLiked(true);
        }
    }, [dispatch, postId, liked]);

    useEffect(() => {
        setDescription(post[postId]?.description);
        setImageUrl(post[postId]?.image_url);
        setUsername(post[postId]?.username);
        setAltText(post[postId]?.alt_text);
        if (user.id === post[postId]?.userId) {
            setDeleteDisplay(true);
            setEditButtonDisplay(true);
        }
    }, [user.id, post, postId, liked]);

    function likePost(e) {
        if (liked) {
            setLiked(false);
            dispatch(deleteOneLike(e.target.id));
        } else {
            setLiked(true);
            dispatch(createLike(user, postId));
        }
    }

    let likeHeart = <i class="fa-regular fa-heart fa-xl" onClick={likePost}></i>;

    if (liked) {
        likeHeart = <i id={likedId} class="fa-solid fa-heart fa-xl" onClick={likePost}></i>;
    }

    let editContent = null;

    if (editDisplay) {
        editContent = <PostEditForm post={post[postId]} hideForm={() => setEditDisplay(false)} />;
    }

    let editButton = null;

    if (editButtonDisplay) {
        editButton = (
            <button className="post-button edit-description-button" onClick={() => setEditDisplay(true)}>
                Edit{" "}
            </button>
        );
    }

    let deleteContent = null;

    if (deleteDisplay) {
        deleteContent = <PostDelete className="post-button delete-post-button" post={post[postId]} />;
    }

    return (
        <>
            <div className="post-container__container">
                <div className="post-container">
                    <div className="post-username">{username}</div>
                    <div className="post-image__container">
                        <img className="post-image" src={imageUrl} alt={altText}></img>
                    </div>

                    <div className="post-description-container">
                        <div className="post-description-buttons">{likeHeart}</div>
                        <div className="post-description-text">{description}</div>
                    </div>
                    {editButton}
                    {deleteContent}
                    {editContent}
                </div>
            </div>
        </>
    );
}

export default Post;
