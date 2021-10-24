import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments, getAllComments } from "../../store/comment";
import CommentForm from "../CommentForm";

function CommentSection({postId}) {
    const dispatch = useDispatch()

    const [postComments, setPostComments] = useState('')

    useEffect(() => {
        dispatch(getAllComments())
        // console.log("eggs")
    }, [dispatch, postId])

    const comments = useSelector((state) => state.comment)
    // console.log(postId)

    // let postComments = {}
    for (let comment in comments){
        if (comment.postId === postId){
            postComments[postId] = comment
        }
    }
    console.log(postComments)

    return (
        <>

        </>
    )
}

export default CommentSection
