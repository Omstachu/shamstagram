// constants
const ADD_IMAGE = 'images/ADD_IMAGE';

const addImage = (image) => ({
  type: ADD_IMAGE,
  payload: image
});

const initialState = { image: null };


export const uploadImage = (picture) => async (dispatch) => {
  const response = await fetch('/api/auth/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        picture
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(addImage(data))
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
    case ADD_IMAGE:
      return { images: action.payload }
    default:
      return state;
  }
}
