const ADD_LIKE = "likes/ADD_LIKE";
const GET_LIKES = "likes/GET_LIKES";
const DELETE_LIKE = "likes/DELETE_LIKE";

const addLike = (like) => ({
    type: ADD_LIKE,
    payload: like,
});

const getLikes = (likes) => ({
    type: GET_LIKES,
    post,
});
const deleteLike = (like) => ({
    type: DELETE_LIKE,
    payload: like,
});

export const createLike = () => async (dispatch) => {
    let new_like = {};

    const res = await fetch("api/likes/", {
        method: "POST",
    });

    if (res.ok) {
        const likeData = await res.json();
        new_like = {
            postId: likeData.postId,
            userId: user.id,
        };
    }

    new_like = JSON.stringify(new_like);
};
