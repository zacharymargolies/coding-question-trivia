import axios from 'axios';
import { URL } from '../store';

// ACTION TYPES
const SET_ALL_ANSWERS = 'GET_ALL_ANSWERS';
const GET_ANSWER_BY_TOPIC = 'GET_ANSWER_BY_TOPIC';
const GET_ANSWER_BY_DIFFICULTY = 'GET_ANSWER_BY_DIFFICULTY';
const SET_RANDOM_ANSWERS = 'SET_RANDOM_ANSWERS';

// ACTION CREATORS
export const setAllAnswers = allAnswers => ({
  type: SET_ALL_ANSWERS,
  answers: allAnswers
});

export const getAnswersByTopic = answersByTopic => ({
  type: GET_ANSWER_BY_TOPIC,
  answers: answersByTopic
});

export const getAnswersByDifficulty = answersByDifficulty => ({
  type: GET_ANSWER_BY_DIFFICULTY,
  answers: answersByDifficulty
});

// THUNK CREATORS
export const fetchAllAnswers = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/answers/`);
    const allAnswers = request.data;
    dispatch(setAllAnswers(allAnswers));
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  answers: []
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_ANSWERS:
      return { ...state, answers: action.answers };
    case SET_RANDOM_ANSWERS:
      return { ...state, randomAnswers: action.answers };
    default:
      return state;
  }
}
