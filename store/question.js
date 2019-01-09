import axios from 'axios';
import { URL } from './index';
import shuffle from 'shuffle-array';

// ACTION TYPES
const SET_CURRENT_QUESTIONS = 'SET_CURRENT_QUESTIONS';
const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
const SET_CURRENT_DIFFICULTY = 'SET_CURRENT_DIFFICULTY';
const SET_ALL_QUIZZABLE_ITEMS = 'SET_ALL_QUIZZABLE_ITEMS';

// ACTION CREATORS
export const setCurrentQuestions = allQuestions => ({
  type: SET_CURRENT_QUESTIONS,
  allQuestions,
});
export const setCurrentQuestionTopic = topicId => ({
  type: SET_CURRENT_TOPIC,
  topicId,
});
export const setCurrentQuestionDifficulty = difficultyLevel => ({
  type: SET_CURRENT_DIFFICULTY,
  difficultyLevel,
});
export const setAllQuizzableItems = allQuizzableItems => ({
  type: SET_ALL_QUIZZABLE_ITEMS,
  allQuizzableItems,
});

// THUNK CREATORS
export const fetchAllQuestions = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/questions/`);
    const allQuestions = request.data;
    dispatch(setCurrentQuestions(allQuestions));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllQuizzableItems = () => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/questions/quizzable/`);
    const allQuizzableItems = request.data;
    dispatch(setAllQuizzableItems(allQuizzableItems));
  } catch (err) {
    console.log(err);
  }
};

// ANSWER FETCHER
const answerFetcher = async questions => {
  // FETCH ALL ANSWERS
  const requestAnswers = await axios.get(`${URL}/api/answers/`);
  const allAnswers = requestAnswers.data;
  // ADD THREE RANDOM ANSWERS TO EACH QUESTION
  questions.forEach(question => {
    question.answerPool = [
      question.answer,
      ...shuffle.pick(allAnswers, { picks: 3 }),
    ];
    question.answerPool = shuffle(question.answerPool);
  });

  return questions;
};

export const fetchQuestionsByTopic = topicId => async dispatch => {
  try {
    const requestQuestions = await axios.get(
      `${URL}/api/questions/topic/${topicId}`
    );
    const questionsByTopic = requestQuestions.data;
    // SET ANSWERS TO QUESTION
    const questionsWithAnswers = await answerFetcher(questionsByTopic);
    dispatch(setCurrentQuestions(questionsWithAnswers));
  } catch (err) {
    console.log(err);
  }
};

export const makeQuizzableQuestions = (quizzable, questions) => () => {
  questions.forEach(async question => {
    const { id } = question;
    try {
      await axios.put(`${URL}/api/questions/quizzable/${id}/${quizzable}`);
    } catch (err) {
      console.log(err);
    }
  });
};

export const fetchQuestionsByDifficulty = difficultyLevel => async dispatch => {
  try {
    const request = await axios.get(
      `${URL}/api/questions/difficulty/${difficultyLevel}`
    );
    const questionsByDifficulty = request.data;
    // SET ANSWERS TO QUESTION
    const questionsWithAnswers = await answerFetcher(questionsByDifficulty);
    dispatch(setCurrentQuestions(questionsWithAnswers));
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

export const fetchQuestionsByTimeline = quantity => async dispatch => {
  try {
    const request = await axios.get(
      `${URL}/api/questions/timeline/${quantity}`
    );
    const quizzableItems = request.data;
    const quizzableItemsWithAnswers = await answerFetcher(quizzableItems);
    dispatch(setCurrentQuestions(quizzableItemsWithAnswers));
  } catch (err) {
    console.log(err);
  }
};

export const fetchRandomQuestions = quantity => async dispatch => {
  try {
    const request = await axios.get(`${URL}/api/questions/random/${quantity}`);
    const quizzableItems = request.data;
    const quizzableItemsWithAnswers = await answerFetcher(quizzableItems);
    dispatch(setCurrentQuestions(quizzableItemsWithAnswers));
  } catch (err) {
    console.log(err);
  }
};

export const updateSRQuestionData = async (questionId, performanceRating) => {
  try {
    const request = await axios.put(
      `${URL}/api/questions/update/${questionId}`,
      { performanceRating }
    );
    const updatedQuestion = request.data;
  } catch (err) {
    console.log(err);
  }
};

// INITIAL STATE
const initialState = {
  questions: [],
  topicId: null,
  difficultyLevel: null,
  allQuizzableItems: [],
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_QUESTIONS:
      return {
        ...state,
        questions: action.allQuestions,
      };
    case SET_CURRENT_TOPIC:
      return {
        ...state,
        topicId: action.topicId,
      };
    case SET_CURRENT_DIFFICULTY:
      return {
        ...state,
        difficultyLevel: action.difficultyLevel,
      };
    case SET_ALL_QUIZZABLE_ITEMS:
      return {
        ...state,
        allQuizzableItems: action.allQuizzableItems,
      };
    default:
      return state;
  }
}
