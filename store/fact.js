import axios from 'axios';
import { URL } from './index';

// ACTION TYPES
const SET_CURRENT_FACTS = 'SET_CURRENT_FACTS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
const SET_CURRENT_DIFFICULTY = 'SET_CURRENT_DIFFICULTY';

// ACTION CREATORS
export const setCurrentFacts = allFacts => ({
  type: SET_CURRENT_FACTS,
  allFacts
});
export const setCurrentFactTopic = topic => ({
  type: SET_CURRENT_TOPIC,
  topic
});
export const setCurrentQuestionDifficulty = difficultyLevel => ({
  type: SET_CURRENT_DIFFICULTY,
  difficultyLevel
});

// THUNK CREATORS
export const fetchAllFacts = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/facts`);
    const allFacts = request.data;
    dispatch(setCurrentFacts(allFacts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByTopic = topicId => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/facts/topic/${topicId}`);
    const facts = request.data;
    dispatch(setCurrentFacts(facts));
  } catch (err) {
    console.log(err);
  }
};

export const fetchFactsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(
      `${URL}/api/facts/difficulty/${difficultyLevel}`
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
  topicId: null,
  difficultyLevel: null
};

// REDUCER
export default function(
  state = { facts: [], topicId: null, difficultyLevel: null },
  action
) {
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
