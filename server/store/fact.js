import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_FACTS = 'SET_CURRENT_FACTS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
const SET_CURRENT_DIFFICULTY = 'SET_CURRENT_DIFFICULTY';

// ACTION CREATORS
export const setCurrentFacts = allFacts => ({
  type: SET_CURRENT_FACTS,
  allFacts
});
export const setCurrentTopic = difficultyLevel => ({
  type: SET_CURRENT_TOPIC,
  difficultyLevel
});
export const setCurrentDifficulty = allFacts => ({
  type: SET_CURRENT_DIFFICULTY,
  allFacts
});

// THUNK CREATORS
export const fetchAllFacts = () => async dispatch => {
  try {
    const request = await axios.get('http://localhost:8080/api/facts');
    // const request = await axios.get("http://192.168.1.5:8080/api/facts");
    const allFacts = request.data;
    dispatch(setCurrentFacts(allFacts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByTopic = topicId => async dispatch => {
  console.log('RAN');
  try {
    const request = await axios.get(
      `http://localhost:8080/api/facts/topic/${topicId}`
      // `http://192.168.1.5:8080/api/facts/${topicId}`
    );
    const facts = request.data;
    dispatch(setCurrentFacts(facts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(
      `http://localhost:8080/api/facts/difficulty/${difficultyLevel}`
      // `http://192.168.1.5:8080/api/facts/${topicId}`
    );
    const factsByDifficulty = request.data;
    dispatch(setCurrentFacts(factsByDifficulty));
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
        topicId: action.topicId
      };
    case SET_CURRENT_DIFFICULTY:
      return {
        ...state,
        difficultyLevel: action.difficultyLevel
      };
    default:
      return state;
  }
}
