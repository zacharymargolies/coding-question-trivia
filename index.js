import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './server/store';

const MainApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default MainApp;
