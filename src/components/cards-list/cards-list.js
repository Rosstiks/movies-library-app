import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import './cards-list.css';

import Card from '../card/card';

export default class CardsList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    changePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    currentSearch: PropTypes.string,
    totalResults: PropTypes.number.isRequired,
    sessionID: PropTypes.string,
    refreshRated: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentPage: 0,
    currentSearch: '',
    sessionID: null,
  };

  createMovieList(data) {
    const { sessionID, refreshRated } = this.props;
    return data.map((el) => {
      const { id } = el;
      return (
        <Col key={id} xs={{ span: 24 }} lg={{ span: 12 }}>
          <Card sessionID={sessionID} refreshRated={refreshRated} {...el} />
        </Col>
      );
    });
  }

  render() {
    const { data, changePage, currentPage, currentSearch, totalResults } = this.props;
    const moviesList = this.createMovieList(data);
    const paginationShow = (
      <Pagination
        current={currentPage}
        total={totalResults}
        onChange={(page) => changePage(page, currentSearch)}
        pageSize={20}
        showSizeChanger={false}
      />
    );
    const pagination = moviesList.length ? paginationShow : null;

    return (
      <>
        <Row gutter={[36, 36]}>{moviesList}</Row>
        <div className="movie-list__pagination-container">{pagination}</div>
      </>
    );
  }
}
