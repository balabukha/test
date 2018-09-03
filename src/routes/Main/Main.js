import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, message } from 'antd';
import { Link } from 'react-router-dom';

import { fetchData } from '../../actions';

const columns = [
  {
    title: 'givenName',
    dataIndex: 'givenName',
    render: (name, obj) => (
      <a target="_blank" href={obj.url}>
        {name}
      </a>
    ),
    width: '20%'
  },
  {
    title: 'familyName',
    dataIndex: 'familyName',
    width: '20%'
  },
  {
    title: 'DOB',
    dataIndex: 'dateOfBirth',
    width: '20%'
  },
  {
    title: 'nationality',
    dataIndex: 'nationality'
  },
  {
    title: 'Race Schedule',
    render: (name, obj) => <Link to={`driver/${obj.driverId}`}>Race Schedule</Link>
  }
];

class Main extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  handleTableChange = pagination => {
    this.props.fetchData(pagination.current).then(() => {
      this.props.data.type === 'FETCHING_DATA_FAILURE'
        ? message.error('Возникла ошибка при запросе, попробуйте позднее')
        : this.setState({
            loading: false,
            data: this.props.data.MRData.DriverTable.Drivers,
            pagination: {
              page: pagination.page,
              pageSize: 10,
              total: +this.props.data.MRData.total
            }
          });
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.fetchData(0).then(() => {
      this.setState({
        loading: false,
        data: this.props.data.MRData.DriverTable.Drivers,
        pagination: { page: 1, pageSize: 10, total: +this.props.data.MRData.total }
      });
    });
  }

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.driverId}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

function MapStateToProps(state) {
  return {
    data: state.riders
  };
}

export default connect(
  MapStateToProps,
  { fetchData }
)(Main);
