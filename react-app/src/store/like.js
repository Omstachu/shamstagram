const ADD_LIKE = "likes/ADD_LIKE";
const GET_LIKE = "likes/GET_LIKE";
const GET_LIKES = "likes/GET_LIKES";
const DELETE_LIKE = "likes/DELETE_LIKE";

const addLike = (like) => ({
    type: ADD_LIKE,
    payload: like,
});

const getLike = () => ({
    type: GET_LIKE,
    payload: true,
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
    let formData = new FormData();
    let new_like = {};

    formData.append("userId", user.id);
    formData.append("postId", postId);

    const res = await fetch(`api/likes/${user.id}/${postId}`);

    if (res.ok) {
        dispatch(getLike());
        return "I cannot believe this is actually working rofl";
    }
};

const initialState = {
    post: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LIKE:
            console.log(state);
            return action.payload;
        default:
            return state;
    }
}
