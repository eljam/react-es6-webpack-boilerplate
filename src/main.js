import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

const routes = require('./routes');

if (typeof document !== 'undefined' && window) {
  window.onload = () => {
    ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
  };
}
