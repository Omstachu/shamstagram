import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { erasePost } from '../store/post';

const PostDeleteButton = ({post}) => {
    const dispatch = useDispatch()
    console.log(post)
    const handleDelete = async (e) => {
        // e.preventDefault();
        await dispatch(erasePost(post))
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default PostDeleteButton
