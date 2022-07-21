const ADD_LIKE = "likes/ADD_LIKE";
const GET_LIKES = "likes/GET_LIKES";
const DELETE_LIKE = "likes/DELETE_LIKE";

const addLike = (like) => ({
    type: ADD_LIKE,
    payload: like,
});

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes,
});
const deleteLike = (like) => ({
    type: DELETE_LIKE,
    payload: like,
});

export const createLike = (user, postId) => async (dispatch) => {
    let new_like = {};

    const res = await fetch("api/likes/", {
        method: "POST",
    });

    if (res.ok) {
        const likeData = await res.json();
        new_like = {
            postId: postId,
            userId: user.id,
        };
        dispatch(addLike(new_like));
    }

    new_like = JSON.stringify(new_like);
};

const initialState = {
    post: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LIKE:
            console.log(state);
            return state;
        default:
            return state;
    }
}
