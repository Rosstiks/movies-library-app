import React from 'react';
import { format } from 'date-fns';
import MovieDBService from '../../services/moviedb-service/moviedb-service';

import './app.css';
import MovieList from '../movie-list';
import Header from '../header';

export default class App extends React.Component {
  movieDBService = new MovieDBService();

  constructor(props) {
    super(props);
    this.getMoviesData('return');
  }

  state = {
    movies: [],
    // currentPage: 1,
    // keyword: '',
  };

  async getMoviesData(keyword) {
    const responseGenres = await this.movieDBService.getActualGenresList();
    const genresList = {};
    responseGenres.forEach((el) => {
      genresList[el.id] = el.name;
    });
    const responseMovies = await this.movieDBService.searchMovies(keyword);
    const movies = responseMovies.map((el) => this.createDataMovie(el, genresList));
    this.setState({ movies });
  }

  createDataMovie(data, genresList) {
    const genres = data.genre_ids.map((id) => ({ id, name: genresList[id] }));
    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      date: format(new Date(data.release_date), 'MMM d, y'),
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      genres,
      vote: data.vote_average,
      popularity: Math.trunc(data.popularity) / 10,
    };
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="container">
        <Header />
        <MovieList movies={movies} />
      </div>
    );
  }
}
