import React, { Component } from 'react';

export default class Thead extends Component {
  render() {
    return <thead>{this.props.children}</thead>;
  }
}
