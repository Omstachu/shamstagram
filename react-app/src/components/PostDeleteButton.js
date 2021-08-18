import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const PostDeleteButton = () => {
    const dispatch = useDispatch()
    //function handleDelete()
    return (
        <div>
            <button onSubmit={handleDelete()}>'Delete'</button>
        </div>
    )
}


