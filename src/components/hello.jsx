import React, { Component } from 'react';

export default class Hello extends Component {

  render() {
    return (
      <p>{this.props.params.name}</p>
    );
  }
}

Hello.propTypes = { params: React.PropTypes.objectOf(React.PropTypes.string).isRequired };
