const ADD_POST = "posts/ADD_POST";
const GET_POST = "posts/GET_POST";
const DELETE_POST = 'posts/DELETE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'

const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

const getPost = (post) => ({
  type: GET_POST,
  post,
});
const deletePost = (post) => ({
  type: DELETE_POST,
  payload: post
})

const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post
})

export const createPost = (user, description, image) => async (dispatch) => {
    let formData = new FormData();
    let new_post = {};
    formData.append("image", image);
    const res = await fetch("/api/images/", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const imageData = await res.json();
      new_post = {
        imageId: imageData.id,
        userId: user.id,
        description,
      };
    }
    new_post = JSON.stringify(new_post);
    formData.append("new_post", new_post);
    const postRes = await fetch("/api/posts/", {
      method: "POST",
      body: formData,
    });

    if (postRes.ok) {
      const data = await postRes.json();
      dispatch(addPost(data))
      return null;
    } else if (postRes.status < 500) {
      const data = await postRes.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }


}



export const getOnePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  // console.log("INSIDE THE THUNK ------------");

  if (response.ok) {
    const detail = await response.json();
    dispatch(getPost(detail));
    // console.log("RESPONSE IS OK ------------");
    return "string of sometighjsfdgab";
  } else {
    console.log("NOT OK ----------");
  }

  if (response.ok) {
    const data = await response.json();
    dispatch(addPost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  };
}

export const editPost = (post) => async (dispatch) => {
  let postId = post.id
  console.log("post", post);
  let formData = new FormData();
  //# post = JSON.stringify(post);
  formData.append("postId", post.id);
  formData.append("description", post.description);
  formData.append("imageId", post.imageId);
  formData.append("userId", post.userId);
  console.log("formData", formData);
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body:formData
  })

  if (response.ok) {
    await response.json();
    dispatch(updatePost(post))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


export const erasePost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post
    })

  })

  if (response.ok) {
    const data = await response.json();
    dispatch(deletePost(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = {
  post: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
    return action.post; //may need to add ...state
    case ADD_POST:
      return { posts: action.payload }
    case DELETE_POST:
      delete state[action.payload.id]
      return state
    case UPDATE_POST:
      const newState = {...state}
      console.log("NEWSTATE", newState)
      console.log("STATE", state)
      newState[action.payload.id] = action.payload
      return newState
    default:
      return state;
    }
  }
