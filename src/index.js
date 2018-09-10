import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.less';
import { store } from './store';

import App from './App';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

module.hot.accept();
