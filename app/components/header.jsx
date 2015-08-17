import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavItemLink } from 'react-router-bootstrap';

export default class Header extends React.Component {

  render() {
      return (
          <Nav bsStyle="tabs">
            <NavItemLink
              to="app">
              Home
            </NavItemLink>
            <NavItemLink
              to="hello"
              params={{ name: 'eljam' }}>
              Hello
            </NavItemLink>
          </Nav>
    );
  }
}
