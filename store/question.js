import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_QUESTIONS = 'SET_CURRENT_QUESTIONS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
const SET_CURRENT_DIFFICULTY = 'SET_CURRENT_DIFFICULTY';

// ACTION CREATORS
export const setCurrentQuestions = allQuestions => ({
  type: SET_CURRENT_QUESTIONS,
  allQuestions
});
export const setCurrentQuestionTopic = topic => ({
  type: SET_CURRENT_TOPIC,
  topic
});
export const setCurrentQuestionDifficulty = difficultyLevel => ({
  type: SET_CURRENT_DIFFICULTY,
  difficultyLevel
});

// THUNK CREATORS
export const fetchAllQuestions = () => async dispatch => {
  try {
    const request = await axios.get('/api/questions');
    const allQuestions = request.data;
    dispatch(setCurrentQuestions(allQuestions));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByTopic = topicId => async dispatch => {
  try {
    const request = await axios.get(`/facts/questions/${topicId}`);
    const questionsByTopic = request.data;
    dispatch(setCurrentQuestions(questionsByTopic));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(`/questions/difficulty/${difficultyLevel}`);
    const questionsByDifficulty = request.data;
    dispatch(setCurrentQuestions(questionsByDifficulty));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByFact = factId => async dispatch => {
  try {
    const request = await axios.get(`/questions/fact/${factId}`);
    const questionsByFact = request.data;
    dispatch(setCurrentQuestions(questionsByFact));
  } catch (err) {
    console.log(err);
  }
};

// INITIAL STATE
const initialState = {
  questions: [],
  topicId: null,
  difficultyLevel: null
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}