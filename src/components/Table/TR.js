import React, { PureComponent } from 'react';

class TR extends PureComponent {
  render() {
    return <tr>{this.props.children}</tr>;
  }
}

export default TR;
