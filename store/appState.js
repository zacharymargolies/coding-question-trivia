// MODES
export const INFORMATION_PLAYGROUND = "INFORMATION_PLAYGROUND";
export const QUIZZABLE_LAND = "QUIZZABLE_LAND";

// ACTION TYPES
const SET_CURRENT_MODE = "SET_CURRENT_MODE";
const SET_LOGIN = "SET_LOGIN";

// ACTION CREATORS
export const setCurrentMode = currentMode => ({
  type: SET_CURRENT_MODE,
  currentMode
});

export const setLogin = login => ({
  type: SET_LOGIN,
  login
});

// INITIAL STATE
const initialState = {
  currentMode: null,
  loggedIn: false
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MODE:
      return {
        ...state,
        currentMode: action.currentMode
      };
    case SET_LOGIN:
      return {
        ...state,
        loggedIn: action.login
      };
    default:
      return state;
  }
}
