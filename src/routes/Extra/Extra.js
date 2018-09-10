import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// hoc for Table
import withTable from '@/components/Table/hocs/withTable';

// TABLE UI
import TR from '@/components/Table/TR';
import TD from '@/components/Table/TD';
import TH from '@/components/Table/TH';
import Thead from '@/components/Table/Thead';
import Tbody from '@/components/Table/Tbody';
// PAGINATION
import PaginationNEW from '@/components/Table/PaginationNEW.js';

const headData = [
  <span>givenName</span>,
  <span>familyName</span>,
  <span>DOB</span>,
  <span>nationality</span>,
  <span>Race Schedule</span>
];
function Extra(props) {
  return (
    <div className="App">
      <table className="table-wrap">
        <Thead>
          <TR selectedItems={null}>
            {headData.map((item, i) => {
              return <TH key={i}>{item}</TH>;
            })}
          </TR>
        </Thead>
        <Tbody>
          {props.dataToRender &&
            props.dataToRender.map(item => {
              return (
                <TR key={item.driverId}>
                  <TD>{item.givenName}</TD>
                  <TD>{item.familyName}</TD>
                  <TD>{item.dateOfBirth}</TD>
                  <TD>{item.nationality}</TD>
                  <TD>
                    <Link to={`./driver/${item.driverId}`}>{'Schedule'}</Link>
                  </TD>
                </TR>
              );
            })}
        </Tbody>
      </table>
      <PaginationNEW
        totalRecords={props.totalRecords}
        pageLimit={10}
        pageNeighbours={1}
        onPageChanged={props.onPageChanged}
      />
    </div>
  );
}

export default withTable(Extra);

Extra.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  dataToRender: PropTypes.array.isRequired
};
