import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments } from "../../store/comment";
import CommentForm from "../CommentForm";

function CommentSection({postId}) {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPostComments())
        // console.log("eggs")
    }, [dispatch])

    const comments = useSelector((state) => state)
    // console.log(comments)

    return (
        <>

        </>
    )
}

export default CommentSection
