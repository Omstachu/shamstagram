import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments, getAllComments } from "../../store/comment";
import CommentForm from "../CommentForm";

function CommentSection({postId}) {
    const dispatch = useDispatch()

    const [postComments, setPostComments] = useState({})

    useEffect(() => {
        dispatch(getAllComments())
        // console.log("eggs")
    }, [dispatch, postId])

    const comments = useSelector((state) => state.comment)
    // console.log(comments)

    // let postComments = {}

    useEffect(() => {

        let postComments = {}
        for (let comment in comments){
            // console.log(comment)
            if (comments[comment].postId === postId){
                console.log(postId)
                postComments[comment] = comments[comment]
            }
        }
        setPostComments(postComments)
    }, [comments, postId])
    console.log(postComments)

    return (
        <>
        {/* {postComments.map()} */}
        </>
    )
}

export default CommentSection
