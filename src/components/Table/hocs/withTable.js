import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchData } from '@/actions';
import { createSelector } from 'reselect';

function withTable(Component) {
  class With extends React.Component {
    state = {
      dataToRender: this.props.riders.hasOwnProperty('MRData')
        ? this.props.riders.MRData.DriverTable.Drivers
        : [],
      totalRecords: this.props.riders.hasOwnProperty('MRData') ? +this.props.riders.MRData.total : 0
    };

    onPageChanged = datas => {
      const { currentPage, totalPages, pageLimit } = datas;
      this.props.fetchData(currentPage).then(() => {
        this.setState({
          currentPage,
          dataToRender: this.props.riders.MRData.DriverTable.Drivers,
          totalPages
        });
      });
    };

    componentDidMount() {
      if (!this.props.riders.hasOwnProperty('MRData')) {
        this.props.fetchData(0).then(() => {
          this.setState(
            {
              dataToRender: this.props.riders.MRData.DriverTable.Drivers,
              totalRecords: +this.props.riders.MRData.total
            },
            () =>
              this.onPageChanged({
                currentPage: 1,
                totalPages: Math.ceil(this.state.totalRecords / 10),
                pageLimit: 10,
                totalRecords: this.state.totalRecords
              })
          );
        });
      }
    }

    render() {
      return (
        <Component
          onPageChanged={this.onPageChanged}
          currentPage={this.state.currentPage}
          totalPages={this.state.totalPages}
          pageLimit={this.state.pageLimit}
          totalRecords={this.state.totalRecords}
          dataToRender={this.state.dataToRender}
        />
      );
    }
  }
  return With;
}

const ridersSelector = createSelector(
  state => state.riders,
  riders => {
    return riders;
  }
);

function mapStateToProps(state) {
  return { riders: ridersSelector(state) };
}

const composedHoc = compose(
  connect(
    mapStateToProps,
    {
      fetchData
    }
  ),
  withTable
);

export default composedHoc;
