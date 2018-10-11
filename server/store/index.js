import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import fact from './fact';

//TODO: IMPORT REDUCERS

const reducer = combineReducers({ fact });
const middleWare = composeWithDevTools(
  applyMiddleware(thunkMiddleWare, createLogger({ collapsd: true }))
);
const store = createStore(reducer, middleWare);

export default store;
