import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { uploadImage } from '../../store/image';
import { editPost } from '../../store/post'
import "./PostEditForm.css"

const PostEditForm = ({post, hideForm}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');

    const user = useSelector(state => state.session.user);

    useEffect (() => {
        setDescription(post?.description);
        // console.log(description)
    }, [post])

    // console.log(post?.description)


    const handleSubmit = async (e) => {
        e.preventDefault();
        post.description = description
        await dispatch(editPost(post))
        hideForm()
}

    const updateDescription = (e) => {
        const description = e.target.value
        setDescription(description)
        console.log(description)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className='edit-form-input'
                placeholder="Description"
                type="text"
                value={description}
                onChange={updateDescription}
                maxLength='140'
            />
            <button className="post-button edit-submit-button" type="submit">Submit</button>
        </form>
    )
}

export default PostEditForm;
