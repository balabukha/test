import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, message } from 'antd';

import { fetchSchedule } from '../../actions';

const columns = [
  {
    title: 'circuitName',
    dataIndex: 'circuitName',
    width: '20%'
  },
  {
    title: 'Location',
    render: (name, obj) => obj.Location.country,
    width: '20%'
  },
  {
    title: 'More',
    render: (name, obj) => (
      <a target="_blank" href={obj.url}>
        more
      </a>
    )
  }
];

class Driver extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.props.fetchSchedule(this.props.match.params.driverId).then(() => {
      this.props.data.type === 'FETCHING_DRIVER_SCHEDULE_FAILURE'
        ? message.error('Возникла ошибка при запросе, попробуйте позднее')
        : this.setState({
            data: this.props.data.Circuits
          });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Table
          columns={columns}
          pagination={false}
          rowKey={record => record.circuitId}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.schedule
  };
}

export default connect(
  mapStateToProps,
  { fetchSchedule }
)(Driver);
