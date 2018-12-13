import axios from 'axios';
import { URL } from './index';
import shuffle from 'shuffle-array';

// ACTION TYPES
const SET_CURRENT_QUESTIONS = 'SET_CURRENT_QUESTIONS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
const SET_CURRENT_DIFFICULTY = 'SET_CURRENT_DIFFICULTY';

// ACTION CREATORS
export const setCurrentQuestions = allQuestions => ({
  type: SET_CURRENT_QUESTIONS,
  allQuestions
});
export const setCurrentQuestionTopic = topicId => ({
  type: SET_CURRENT_TOPIC,
  topicId
});
export const setCurrentQuestionDifficulty = difficultyLevel => ({
  type: SET_CURRENT_DIFFICULTY,
  difficultyLevel
});

// THUNK CREATORS
export const fetchAllQuestions = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/questions`);
    const allQuestions = request.data;
    dispatch(setCurrentQuestions(allQuestions));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByTopic = topicId => async dispatch => {
  try {
    // FETCH QUESTIONS BY TOPIC
    const requestQuestions = await axios.get(
      `${URL}/api/questions/topic/${topicId}`
    );
    const questionsByTopic = requestQuestions.data;

    // FETCH ALL ANSWERS
    const requestAnswers = await axios.get(`${URL}/api/answers/`);
    const allAnswers = requestAnswers.data;

    // ADD THREE RANDOM ANSWERS TO EACH QUESTION
    questionsByTopic.forEach(question => {
      question.answerPool = [
        question.answer,
        ...shuffle.pick(allAnswers, { picks: 3 })
      ];
    });
    dispatch(setCurrentQuestions(questionsByTopic));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(
      `${URL}/api/questions/difficulty/${difficultyLevel}`
    );
    const questionsByDifficulty = request.data;
    dispatch(setCurrentQuestions(questionsByDifficulty));
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuestionsByFact = factId => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/questions/fact/${factId}`);
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
    case SET_CURRENT_QUESTIONS:
      return {
        ...state,
        questions: action.allQuestions
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
