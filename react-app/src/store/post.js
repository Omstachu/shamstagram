const ADD_POST = 'posts/ADD_POST'

const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

const initialState = {
    post: null
}

export const createPost = (post) => async (dispatch) => {
    const response = await fetch('/api/posts', {
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
        dispatch(addPost(data))
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

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_POST:
        return { posts: action.payload }
      default:
        return state;
    }
  }
