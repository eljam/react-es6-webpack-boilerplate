import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import Home from './components/home';
import Application from './components/app';
import Hello from './components/hello';
import NotFound from './components/notfound';

export default (
  <Route name="app" path="/" handler={Application}>
    <Route name="hello" path="hello/:name" handler={Hello} />
    <DefaultRoute handler={Home} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);
