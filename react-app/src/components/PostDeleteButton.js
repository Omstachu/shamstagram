import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { erasePost } from '../store/post';

const PostDeleteButton = ({post}) => {
    const dispatch = useDispatch()
    console.log(post)
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(erasePost(post))
    }

    return (
        <div>
            <form onSubmit={handleDelete}>
            <button type='submit'>Delete</button>
            </form>
        </div>
    )
}

export default PostDeleteButton
