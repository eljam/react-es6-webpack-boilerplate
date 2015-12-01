import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {

  render() {
    return (
          <Nav bsStyle="tabs">
            <IndexLinkContainer
              to="/">
              <NavItem>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer
              to="/hello/eljam">
              <NavItem>Hello</NavItem>
            </LinkContainer>
          </Nav>
    );
  }
}
