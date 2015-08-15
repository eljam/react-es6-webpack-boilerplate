import React from 'react';

export default class Home extends React.Component {

    render() {
        return <h1>{this.props.name}</h1>;
      }
}

Home.propTypes = { name: React.PropTypes.string.isRequired };
