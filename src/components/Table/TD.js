import React, { PureComponent } from 'react';

class TD extends PureComponent {
  render() {
    return <td {...this.props}>{this.props.children}</td>;
  }
}

export default TD;
