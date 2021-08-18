import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { uploadImage } from '../store/image';
import { editPost } from '../store/post'

const PostEditForm = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');

    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
}

    const updateDescription = (e) => {
        const description = e.target.value
        setDescription(description)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Description"
                type="text"
                value={description}
                onChange={updateDescription}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default PostForm;
