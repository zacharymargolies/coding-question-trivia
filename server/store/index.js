import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import fact from './fact';
import question from './question';

//TODO: IMPORT REDUCERS

const reducer = combineReducers({ fact, question });
// const middleWare = composeWithDevTools(
//   applyMiddleware(thunkMiddleWare, createLogger({ collapsd: true }))
// );
const middleWare = composeWithDevTools(applyMiddleware(thunkMiddleWare));
const store = createStore(reducer, middleWare);

export default store;
