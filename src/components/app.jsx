import React, { Component } from 'react';
import Header from './header';
import { Jumbotron } from 'react-bootstrap';

export default class App extends Component {

  render() {
    return (
      <div className="main-content">
        <Jumbotron>
            <Header />
            {this.props.children}
        </Jumbotron>
      </div>
    );
  }
}

App.propTypes = { children: React.PropTypes.object.isRequired };
