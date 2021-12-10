import React from 'react';
import './card-header.css';
import PropTypes, { string } from 'prop-types';
import classNames from 'classnames';

export default function CardHeader({ poster, globalRate, title, date, genresIds, genresList }) {
  const genresBlocks = genresIds.map((el) => (
    <span key={el} className="movie-item__genres-item">
      {genresList[el]}
    </span>
  ));

  const rateStatus = classNames({
    'movie-item__vote-container--low': globalRate < 3,
    'movie-item__vote-container--pre-intermediate': globalRate >= 3 && globalRate < 5,
    'movie-item__vote-container--intermediate': globalRate >= 5 && globalRate < 7,
  });

  return (
    <header className="movie-item__header">
      <img className="movie-item__poster" src={poster} alt="Movie poster" />
      <div className="movie-item__header-content">
        <div className={`movie-item__vote-container ${rateStatus}`}>
          <span className="movie-item__vote">{globalRate}</span>
        </div>
        <h3 className="movie-item__title">{title}</h3>
        <div className="movie-item__date">{date}</div>
        <div className="movie-item__genres-container">{genresBlocks}</div>
      </div>
    </header>
  );
}

CardHeader.defaultProps = {
  globalRate: 0,
  genresList: {},
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genresIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  genresList: PropTypes.objectOf(string),
  globalRate: PropTypes.number,
};
