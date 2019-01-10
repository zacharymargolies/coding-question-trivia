import axios from 'axios';
import { URL } from './index';

// ACTION TYPES
const SET_USER = 'SET_USER';
const SET_ERROR = 'SET_ERROR';

// ACTION CREATORS
export const setUser = userInfo => ({ type: SET_USER, userInfo });
export const setError = error => ({ type: SET_ERROR, error });

// THUNK CREATORS
export const signUpUser = (email, password) => async dispatch => {
  try {
    await axios.post(`${URL}/auth/signup`, {
      email,
      password,
    });
  } catch (err) {
    dispatch(setError('SIGN UP FAILED. PLEASE TRY AGAIN.'));
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
    const errMessage = err.response.data;
    dispatch(setError(errMessage));
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const user = await axios.post(`${URL}/auth/logout`);
    dispatch(setUser({ email: '', id: '' }));
  } catch (err) {
    const errMessage = err.response.data;
    dispatch(setError(errMessage));
  }
};

const initialState = {
  email: '',
  id: 0,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        email: action.userInfo.email,
        id: action.userInfo.id,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
