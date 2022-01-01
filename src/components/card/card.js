import React from 'react';
import PropTypes from 'prop-types';
import { GenresConsumer } from '../../genres-context';
import './card.scss';
import CardHeader from '../card-header';
import ItemRate from '../item-rate';
import MovieDBService from '../../services/moviedb-service/moviedb-service';

export default class Card extends React.Component {
  movieDBService = new MovieDBService();

  static defaultProps = {
    userRate: 0,
    overview: 'Overview not found',
    sessionID: null,
  };

  static propTypes = {
    overview: PropTypes.string,
    userRate: PropTypes.number,
    id: PropTypes.number.isRequired,
    sessionID: PropTypes.string,
    refreshRated: PropTypes.func.isRequired,
  };

  changeRate = (value) => {
    const { rateMovie } = this.movieDBService;
    const { id, sessionID, refreshRated } = this.props;
    rateMovie(id, value, sessionID).then(() => {
      setTimeout(() => refreshRated(), 1000);
    });
  };

  render() {
    const { overview, userRate, id, ...other } = this.props;

    return (
      <div className="movie-item">
        <GenresConsumer>{(genresList) => <CardHeader {...other} genresList={genresList} />}</GenresConsumer>
        <p id={id} className="movie-item__overview">
          {overview}
        </p>
        <footer className="movie-item__footer">
          <ItemRate userRate={userRate} changeRate={(value) => this.changeRate(value)} />
        </footer>
      </div>
    );
  }
}
