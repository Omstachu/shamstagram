import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { uploadImage } from "../store/image";
import { createPost, getOnePost } from "../store/post";

const PostForm = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [post, setPost] = useState({ id: 0 });
  const [imageDB, setImageDB] = useState(null);
  const [description, setDescription] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOnePost(post.id));
  // }, [dispatch, post]);

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    //   formData.append("post", post)

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    console.log();
    const res = await fetch("/api/images/", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const imageData = await res.json();
      console.log("image data ----", imageData);
      setImageLoading(false);
      let new_post = {
        imageId: imageData.id,
        userId: user.id,
        description,
      };

      new_post = JSON.stringify(new_post);

      //   console.log("new_post --------", new_post)
      //   formData = new FormData()

      formData.append("new_post", new_post);
      //   formData.append("imageId", imageData.id)
      //   formData.append("userId", user.id)
      //   formData.append("description", description)

      const postRes = await fetch("/api/posts/", {
        method: "POST",
        body: formData,
      });

      if (postRes.ok) {
        const data = await postRes.json();
        setPost(data);
        console.log("post --------------", data);
      }

      //   history.push("/post");
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
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
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={updateImage} />
      <input
        placeholder="Description"
        type="text"
        value={description}
        onChange={updateDescription}
      />
      <button type="submit">Submit</button>
      {imageLoading && <p>Loading...</p>}
    </form>
  );
};

export default PostForm;
