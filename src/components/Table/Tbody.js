import React, { Component } from 'react';

export default class Tbody extends Component {
  render() {
    return <tbody>{this.props.children}</tbody>;
  }
}
