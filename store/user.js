import axios from 'axios';
import { URL } from './index';

// ACTION TYPES
const SET_USER = 'SET_USER';

// ACTION CREATORS
export const setUser = userInfo => ({ type: SET_USER, userInfo });

// THUNK CREATORS
export const signUpUser = (email, password) => async () => {
  try {
    await axios.post(`${URL}/auth/signup`, {
      email,
      password,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = (userEmail, password) => async dispatch => {
  try {
    const user = await axios.post(`${URL}/auth/login`, {
      email: userEmail,
      password,
    });
    const { email, id } = user.data;
    dispatch(setUser({ email, id }));
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  email: '',
  id: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.userInfo.email,
        id: action.userInfo.id,
      };
    default:
      return state;
  }
}
