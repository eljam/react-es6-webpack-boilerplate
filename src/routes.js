import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/home';
import Application from './components/app';
import Hello from './components/hello';
import NotFound from './components/notfound';

export default (
  <Route name="home" path="/" component={Application}>
    <IndexRoute component={Home} />

    <Route name="hello" path="hello/:name" component={Hello} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
