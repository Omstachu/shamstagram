const ADD_LIKE = "likes/ADD_LIKE";
const GET_LIKE = "likes/GET_LIKE";
const DELETE_LIKE = "likes/DELETE_LIKE";

const addLike = (like) => ({
    type: ADD_LIKE,
    payload: like,
});

const getLike = (liked) => ({
    type: GET_LIKE,
    payload: liked,
});

const deleteLike = (like) => ({
    type: DELETE_LIKE,
    payload: like,
});

export const createLike = (user, postId) => async (dispatch) => {
    let formData = new FormData();
    let new_like = {};

    formData.append("userId", user.id);
    formData.append("postId", postId);
    const res = await fetch("api/likes/", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        new_like = {
            postId: postId,
            userId: user.id,
        };
        new_like = JSON.stringify(new_like);
        dispatch(addLike(new_like));
    }
};

export const getOneLike = (user, postId) => async (dispatch) => {
    const res = await fetch(`api/likes/${user.id}/${postId}`);

    if (res.ok) {
        let like = await res.json();
        let likelike = like.like;

        dispatch(getLike(true));
        if (likelike) {
            return likelike.id;
        } else {
            return false;
        }
    }
};

export const deleteOneLike = (id) => async (dispatch) => {
    const res = await fetch(`api/likes/${id}/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
        }),
    });

    if (res.ok) {
        let like = await res.json();
        dispatch(deleteLike(like));
    }
};

const initialState = {
    post: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LIKE:
            return action.payload;
        case GET_LIKE:
            return action.payload;
        case DELETE_LIKE:
            if (action.payload["Success"]) {
                delete action.payload["Success"];
                return state;
            }
            break;
        default:
            return state;
    }
}
