const ADD_POST = "posts/ADD_POST";
const GET_POST = "posts/GET_POST";

const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

const getPost = (post) => ({
  type: GET_POST,
  payload: post,
});

export const getOnePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  console.log("INSIDE THE THUNK ------------", await response.json());

  if (response.ok) {
    const detail = await response.json();
    dispatch(getPost(detail));
    console.log("RESPONSE IS OK ------------");
    return "string of sometighjsfdgab";
  } else {
    console.log("NOT OK ----------");
  }
};

export const createPost = (post) => async (dispatch) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = {
  post: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return { posts: action.payload };
    case GET_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
}
