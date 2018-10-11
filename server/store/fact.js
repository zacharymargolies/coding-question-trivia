import axios from 'axios';

// ACTION TYPES
const GET_ALL_FACTS = 'GET_ALL_FACTS';

// ACTION CREATORS
const getAllFacts = allFacts => ({ type: GET_ALL_FACTS, allFacts });

// THUNK CREATORS
export const fetchAllFacts = () => async dispatch => {
  try {
    console.log('FETCH ALL FACTS CALLED');
    const request = await axios.get('http://localhost:8080/api/facts');
    const allFacts = request.data;
    dispatch(getAllFacts(allFacts));
  } catch (err) {
    console.log(err);
  }
};

// INITIAL STATE
const initialState = {
  facts: []
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FACTS:
      return {
        ...state,
        facts: action.allFacts
      };
    default:
      return state;
  }
}
