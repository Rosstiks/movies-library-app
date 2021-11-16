import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './movie-list.css';

import MovieItem from '../movie-item/movie-item';

export default function MovieList({ movies }) {
  const moviesList = movies.map((el) => {
    const { id } = el;
    return (
      <Col key={id} xs={{ span: 24 }} lg={{ span: 12 }}>
        <MovieItem {...el} />
      </Col>
    );
  });

  return <Row gutter={[36, 36]}>{moviesList}</Row>;
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
