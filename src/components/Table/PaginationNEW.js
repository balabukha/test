import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class PaginationNEW extends Component {
  state = {
    currentPage: 1,
    totalRecords: typeof this.props.totalRecords === 'number' ? this.props.totalRecords : 0,
    pageLimit: typeof this.props.pageLimit === 'number' ? this.props.pageLimit : 30,
    pageNeighbours:
      typeof this.props.pageNeighbours === 'number'
        ? Math.max(0, Math.min(this.props.pageNeighbours, 2))
        : 0,
    totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit)
  };

  componentDidMount() {
    this.gotoPage(1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalRecords !== this.props.totalRecords) {
      this.gotoPage(1);
      this.setState({
        totalRecords: typeof nextProps.totalRecords === 'number' ? nextProps.totalRecords : 0,
        pageLimit: typeof nextProps.pageLimit === 'number' ? nextProps.pageLimit : 30,
        pageNeighbours:
          typeof nextProps.pageNeighbours === 'number'
            ? Math.max(0, Math.min(nextProps.pageNeighbours, 2))
            : 0,
        totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit)
      });
    }
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.state.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: this.state.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.state.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.state.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.state.pageNeighbours;

    const totalNumbers = this.state.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.state.totalRecords) return null;

    if (this.state.totalPages === 1) return null;

    let { currentPage } = this.state;
    let pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Назад</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Вперед</span>
                    </a>
                  </li>
                );

              return (
                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" onClick={e => this.handleClick(page, e)}>
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

PaginationNEW.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func.isRequired
};

export default PaginationNEW;
