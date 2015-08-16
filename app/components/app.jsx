import React from 'react';
import { RouteHandler } from 'react-router';
import Header from './header';

export default class App extends React.Component {

  render() {
    return (
      <div className="main-content">
        <Header />
        <RouteHandler />
      </div>
    );
  }
}
