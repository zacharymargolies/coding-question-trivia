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
export const setCurrentTopic = topic => ({
  type: SET_CURRENT_TOPIC,
  topic
});
export const setCurrentDifficulty = difficultyLevel => ({
  type: SET_CURRENT_DIFFICULTY,
  difficultyLevel
});

// THUNK CREATORS
export const fetchAllFacts = () => async dispatch => {
  try {
    const request = await axios.get('/facts');
    const allFacts = request.data;
    dispatch(setCurrentFacts(allFacts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByTopic = topicId => async dispatch => {
  try {
    const request = await axios.get(`/facts/topic/${topicId}`);
    const facts = request.data;
    dispatch(setCurrentFacts(facts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(`/facts/difficulty/${difficultyLevel}`);
    const factsByDifficulty = request.data;
    dispatch(setCurrentFacts(factsByDifficulty));
  } catch (err) {
    console.log(err);
  }
};

// INITIAL STATE
const initialState = {
  facts: [],
  topicId: null,
  difficultyLevel: null
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
