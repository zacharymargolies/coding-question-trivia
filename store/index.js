import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import fact from './fact';
import question from './question';
import appState from './appState';
import answer from './answer';

// export const URL = 'https://coding-trivia.herokuapp.com';
export const URL = 'http://localhost:8080';

const reducer = combineReducers({ fact, question, appState, answer });
// const middleWare = composeWithDevTools(
//   applyMiddleware(thunkMiddleWare, createLogger({ collapsd: true }))
// );
const middleWare = composeWithDevTools(applyMiddleware(thunkMiddleWare));
const store = createStore(reducer, middleWare);

export default store;
