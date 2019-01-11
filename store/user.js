import axios from 'axios';
import { URL } from './index';

// ACTION TYPES
const SET_USER = 'SET_USER';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

// ACTION CREATORS
export const setUser = userInfo => ({ type: SET_USER, userInfo });
export const setLoginStatus = status => ({ type: SET_LOGIN_STATUS, status });

// THUNK CREATORS
export const signUpUser = (email, password) => async dispatch => {
  try {
    const user = await axios.post(`${URL}/auth/signup`, {
      email,
      password,
    });
    if (user)
      dispatch(setLoginStatus('User successfully created. Please Log In.'));
  } catch (err) {
    dispatch(setLoginStatus(err.response.data));
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
    dispatch(setLoginStatus(errMessage));
  }
};

export const logoutUser = () => async dispatch => {
  try {
    const user = await axios.post(`${URL}/auth/logout`);
    dispatch(setUser({ email: '', id: '' }));
  } catch (err) {
    const errMessage = err.response.data;
    dispatch(setLoginStatus(errMessage));
  }
};

const initialState = {
  email: '',
  id: 0,
  status: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, email: action.userInfo.email, id: action.userInfo.id };
    case SET_LOGIN_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
