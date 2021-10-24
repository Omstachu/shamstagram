const ADD_COMMENT = "comments/ADD_COMMENT"
const GET_COMMENT = "comments/GET_COMMENT"
const DELETE_COMMENT = "comments/DELETE_COMMENT"
const UPDATE_COMMENT = "comments/UPDATE_COMMENT"

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
})

const getComment = (comment) => ({
    type: GET_COMMENT,
    payload: comment,
})

export const createComment = (user, post, content) => async (dispatch) => {
    let formData = new FormData();

    formData.append("userId", user.id)
    formData.append("postId", post.id)
    formData.append("content", content)

    const res = await fetch("/api/comments/", {
        method: "POST",
        body: formData,
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(addComment(data));
        return { data: data };
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
        return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getPostComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`)

    if (response.ok) {
        const comments = await response.json()
        dispatch(getComment(comments))
    }
}

const initialState = {
    post: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return { comments: action.payload}
        case GET_COMMENT:
            return action.comment;
        default:
            return state
    }
}
