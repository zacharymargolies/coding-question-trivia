import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_FACTS = 'SET_CURRENT_FACTS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';

// ACTION CREATORS
export const setCurrentFacts = allFacts => ({
  type: SET_CURRENT_FACTS,
  allFacts
});
export const setCurrentTopic = topicId => ({
  type: SET_CURRENT_TOPIC,
  topicId
});

// THUNK CREATORS
export const fetchAllFacts = () => async dispatch => {
  try {
    const request = await axios.get('http://localhost:8080/api/facts');
    const allFacts = request.data;
    dispatch(setCurrentFacts(allFacts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByTopic = topicId => async dispatch => {
  try {
    const request = await axios.get(
      `http://localhost:8080/api/facts/${topicId}`
    );
    const facts = request.data;
    dispatch(setCurrentFacts(facts));
  } catch (err) {
    console.log(err);
  }
};

// INITIAL STATE
const initialState = {
  facts: [],
  topicId: null
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_FACTS:
      return {
        ...state,
        facts: action.allFacts
      };
    case SET_CURRENT_TOPIC:
      return {
        ...state,
        facts: action.topicId
      };
    default:
      return state;
  }
}
