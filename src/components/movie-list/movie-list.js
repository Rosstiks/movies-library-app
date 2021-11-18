import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
import './movie-list.css';

import MovieItem from '../movie-item/movie-item';

export default class MovieList extends React.Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    changePages: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    currentSearch: PropTypes.string.isRequired,
    totalResults: PropTypes.number.isRequired,
  };

  createMovieList(movies) {
    return movies.map((el) => {
      const { id } = el;
      return (
        <Col key={id} xs={{ span: 24 }} lg={{ span: 12 }}>
          <MovieItem {...el} />
        </Col>
      );
    });
  }

  render() {
    const { movies, changePages, currentPage, currentSearch, totalResults } = this.props;
    const moviesList = this.createMovieList(movies);
    const paginationShow = (
      <Pagination
        current={currentPage}
        total={totalResults}
        onChange={(page) => changePages(page, currentSearch)}
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
