import React from 'react';
import { RouteHandler } from 'react-router';
import Header from './header';
import {Jumbotron} from 'react-bootstrap';

export default class App extends React.Component {

  render() {
    return (
      <div className="main-content">
        <Jumbotron>
            <Header />
            <h1>Homepage</h1>
            <RouteHandler />
        </Jumbotron>
      </div>
    );
  }
}
