import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/comment";
import "./CommentForm.css";

const CommentForm = ({post, hideForm}) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")

    const user = useSelector((state) => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        post.content = content
        await dispatch(createComment(user, post, content));
        // hideForm()
    }

    const updateContent = (e) => {
        const content = e.target.value;
        setContent(content)
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
            className="comment-form-input"
            placeholder="Content"
            type="text"
            value={content}
            onChange={updateContent}
            maxLength="140"
            />
            <div className="charcounter_description">Characters Remaining : {140 - content.length}</div>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default CommentForm;
