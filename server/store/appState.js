// ACTION TYPES
const SET_CURRENT_MODE = 'SET_CURRENT_MODE';

// ACTION CREATORS
export const setCurrentMode = currentMode => ({
  type: SET_CURRENT_MODE,
  currentMode
});

// INITIAL STATE
const initialState = {
  currentMode: null
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MODE:
      return {
        ...state,
        currentMode: action.currentMode
      };
    default:
      return state;
  }
}
