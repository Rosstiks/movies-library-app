import React from 'react';
import './movie-item__header.css';
import PropTypes from 'prop-types';

export default function MovieItemHeader({ poster, vote, title, date, genres }) {
  const genresBlocks = genres.map((el) => (
    <span key={el.id} className="movie-item__genres-item">
      {el.name}
    </span>
  ));

  return (
    <header className="movie-item__header">
      <img className="movie-item__poster" src={poster} alt="Movie poster" />
      <div className="movie-item__header-content">
        <div className="movie-item__vote-container">
          <span className="movie-item__vote">{vote}</span>
        </div>
        <h3 className="movie-item__title">{title}</h3>
        <div className="movie-item__date">{date}</div>
        <div className="movie-item__genres-container">{genresBlocks}</div>
      </div>
    </header>
  );
}

MovieItemHeader.defaultProps = {
  genres: ['No info'],
  vote: 0,
};

MovieItemHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object),
  vote: PropTypes.number,
};
