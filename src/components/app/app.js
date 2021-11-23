import React from 'react';
import { Spin, Alert } from 'antd';
import MovieDBService from '../../services/moviedb-service/moviedb-service';

import './app.css';
import MovieList from '../movie-list';
import Header from '../header';

export default class App extends React.Component {
  static messages = {
    errorMessage: 'Sorry, something went wrong. Try to reload the page and repeat.',
    noResultsMessage: 'Sorry, no results were found. Try to change your request.',
  };

  movieDBService = new MovieDBService();

  state = {
    movies: [],
    currentSearch: '',
    currentPage: 1,
    totalResults: 0,
    loading: true,
    loadingError: false,
  };

  componentDidMount() {
    const { currentPage, currentSearch } = this.state;
    this.getMoviesData(currentPage, currentSearch);
  }

  getMoviesData = async (page, keyword) => {
    if (keyword === '') {
      this.setState({ movies: [], currentSearch: '', totalResults: 0, loading: false, loadingError: false });
      return;
    }
    try {
      this.setState({ loading: true });
      const responseMovies = await this.movieDBService.searchMovies(page, keyword);
      const { data, currentPage, totalResults } = responseMovies;
      this.setState({ movies: data, loading: false, loadingError: false, currentSearch: keyword, currentPage, totalResults });
    } catch (er) {
      this.setState({ loadingError: true, loading: false });
    }
  };

  render() {
    const { loading, loadingError, currentSearch, totalResults, ...data } = this.state;
    const { errorMessage, noResultsMessage } = App.messages;
    const errorBlock = <Alert message="Bad news" description={errorMessage} showIcon type="error" />;
    const noResultsBlock = <Alert message="Oooops" description={noResultsMessage} showIcon type="info" />;
    const contentBlock = (
      <MovieList changePages={this.getMoviesData} currentSearch={currentSearch} totalResults={totalResults} {...data} />
    );

    const noResults = currentSearch.length && !totalResults && !loading ? noResultsBlock : null;
    const error = loadingError ? errorBlock : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || loadingError) ? contentBlock : null;

    return (
      <div className="container">
        <Header newSearch={this.getMoviesData} />
        {noResults}
        {error}
        {spinner}
        {content}
      </div>
    );
  }
}

function Spinner() {
  return (
    <div className="example">
      <Spin size="large" />
    </div>
  );
}
