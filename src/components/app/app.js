import React from 'react';
import { Spin, Alert } from 'antd';
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
    loading: true,
    loadingError: false,
    // currentPage: 1,
    // keyword: '',
  };

  async getMoviesData(keyword) {
    try {
      const responseMovies = await this.movieDBService.searchMovies(keyword);
      this.setState({ movies: responseMovies, loading: false });
    } catch (er) {
      this.setState({ loadingError: true, loading: false });
    }
  }

  render() {
    const { movies, loading, loadingError } = this.state;
    const errorMessage = 'Sorry, something went wrong. Try to reload the page and repeat';

    const error = loadingError ? <Alert message="Bad news" description={errorMessage} showIcon type="error" /> : null;
    const speaner = loading ? <Speaner /> : null;
    const content = !(loading || loadingError) ? <MovieList movies={movies} /> : null;

    return (
      <div className="container">
        <Header onChange={this.getMovie} />
        {error}
        {speaner}
        {content}
      </div>
    );
  }
}

function Speaner() {
  return (
    <div className="example">
      <Spin size="large" />
    </div>
  );
}
