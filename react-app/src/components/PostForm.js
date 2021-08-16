import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { uploadImage } from '../store/image';

const PostForm = () => {
  const [errors, setErrors] = useState([]);
  const [imageUpload, setImageUpload] = useState();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onUpload = async (e) => {
    e.preventDefault();
    if (imageUpload) {
      const data = await dispatch(uploadImage( imageUpload));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateImageUpload = (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onUpload}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Email</label>
        <input 
          type="file" 
          id="image" 
          name="image"
          onChange={updateImageUpload}
        ></input>
      </div>
      <button type='submit'>Upload Image</button>
    </form>
  );
};

export default PostForm;
