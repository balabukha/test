import React, { PureComponent } from 'react';

export default class TH extends PureComponent {
  render() {
    return <th {...this.props}>{this.props.children}</th>;
  }
}
