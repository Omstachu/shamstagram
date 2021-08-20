import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/post";
import Post from "../Post";
import "./PostFeed.css";

function PostFeed() {
  const dispatch = useDispatch();
  let list = [];

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.post);

  for (let key in posts) {
    if (key !== "post") {
      list.push(key);
    }
  }

  return (
    <div className="all-post-container__container">
      <div className="all-post-container">
        {list.map((post) => (
          <Post postId={post} />
        ))}
      </div>
    </div>
  );
}

export default PostFeed;
