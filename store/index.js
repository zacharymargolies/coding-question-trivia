import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import fact from './fact';
import question from './question';
import appState from './appState';
import answer from './answer';
import user from './user';

// export const URL = 'https://coding-trivia.herokuapp.com';
export const URL = 'http://localhost:8080';
// export const URL = 'http://172.16.23.28:8080';

export const playgroundSelectors = [
  {
    main: 'Topics',
    image: 'https://i.ytimg.com/vi/xOGxyw9DSa8/maxresdefault.jpg',
    id: 1,
  },
  {
    main: 'Difficulty',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF3kq4R9m6RqKS2W3weyEiBfVXaaTO8HmMAghHLH3yTXSe3tt',
    id: 2,
  },
  {
    main: 'Random',
    image:
      'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Random-512.png',
    id: 3,
  },
];

export const quizzableSelectors = [
  {
    main: 'Topics',
    image: 'https://i.ytimg.com/vi/xOGxyw9DSa8/maxresdefault.jpg',
    id: 1,
  },
  {
    main: 'Difficulty',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF3kq4R9m6RqKS2W3weyEiBfVXaaTO8HmMAghHLH3yTXSe3tt',
    id: 2,
  },
  {
    main: 'Random',
    image:
      'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Random-512.png',
    id: 3,
  },
  {
    main: 'Timeline',
    image: 'http://togishidojo.com/wp-content/uploads/2015/02/timeline.png',
    id: 4,
  },
];

const reducer = combineReducers({ fact, question, appState, answer, user });
// const middleWare = composeWithDevTools(
//   applyMiddleware(thunkMiddleWare, createLogger({ collapsd: true }))
// );
const middleWare = composeWithDevTools(applyMiddleware(thunkMiddleWare));
const store = createStore(reducer, middleWare);

export default store;
