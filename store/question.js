import axios from "axios";
import { URL } from "./index";
import shuffle from "shuffle-array";

// ACTION TYPES
const SET_CURRENT_QUESTIONS = "SET_CURRENT_QUESTIONS";
const SET_CURRENT_TOPIC = "SET_CURRENT_TOPIC";
const SET_CURRENT_DIFFICULTY = "SET_CURRENT_DIFFICULTY";

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

// ANSWER FETCHER
const answerFetcher = async questions => {
  // FETCH ALL ANSWERS
  const requestAnswers = await axios.get(`${URL}/api/answers/`);
  const allAnswers = requestAnswers.data;

  // ADD THREE RANDOM ANSWERS TO EACH QUESTION
  questions.forEach(question => {
    question.answerPool = [
      question.answer,
      ...shuffle.pick(allAnswers, { picks: 3 })
    ];
    question.answerPool = shuffle(question.answerPool);
  });

  return questions;
};

export const fetchQuestionsByTopic = (topicId, userId) => async dispatch => {
  try {
    // FETCH QUESTIONS BY TOPIC
    // const requestQuestions = await axios.get(
    //   `${URL}/api/questions/topic/${topicId}`
    // );
    const requestQuestions = await axios.get(
      `${URL}/api/questions/user/${userId}/topic/${topicId}`
    );
    const questionsByTopic = requestQuestions.data;
    // SET ANSWERS TO QUESTION
    const questionsWithAnswers = await answerFetcher(questionsByTopic);
    console.log("--- QUESTION WITH ANSWERS: --- ", questionsWithAnswers);

    dispatch(setCurrentQuestions(questionsWithAnswers));
  } catch (err) {
    console.log(err);
  }
};

export const makeQuizzableQuestions = (
  userId,
  quizzable,
  questions
) => async () => {
  questions.forEach(async question => {
    const { id } = question;
    try {
      await axios.put(
        `${URL}/api/questions/user/${userId}/quizzable/${id}/${quizzable}`
      );
    } catch (err) {
      console.log(err);
    }
  });
};

export const fetchQuestionsByDifficulty = (
  difficultyLevel,
  userId
) => async dispatch => {
  try {
    // FETCH QUESTION BY DIFFICULTY
    // const request = await axios.get(
    //   `${URL}/api/questions/difficulty/${difficultyLevel}`
    // );
    const request = await axios.get(
      `${URL}/api/questions/user/${userId}/difficulty/${difficultyLevel}`
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
