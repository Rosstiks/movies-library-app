import { format } from 'date-fns';
import noFoundPoster from './no_image_poster.png';

export default class MovieDBService {
  _apiKey = 'api_key=b7473b579abba0475a9336164324a2c1';

  _apiBase = 'https://api.themoviedb.org/3';

  requestFromDB = async (request) => {
    const response = await fetch(`${this._apiBase}${request}`);
    const data = await response.json();
    return data;
  };

  searchMovies = async (page, keyword) => {
    const response = await this.requestFromDB(`/search/movie?${this._apiKey}&query=${keyword}&page=${page}`);
    const genres = await this.getActualGenresList();
    const data = response.results.map((el) => this.createDataMovie(el, genres));
    return {
      data,
      currentPage: response.page,
      totalResults: response.total_results,
    };
  };

  getActualGenresList = async () => {
    const genresList = await this.requestFromDB(`/genre/movie/list?${this._apiKey}`);
    return genresList.genres.reduce((acc, el) => {
      acc[el.id] = el.name;
      return acc;
    }, {});
  };

  createDataMovie = (data, genresList) => {
    const genres = data.genre_ids.map((id) => ({ id, name: genresList[id] }));
    let date;
    try {
      date = format(new Date(data.release_date), 'MMM d, y');
    } catch (err) {
      date = 'No date info';
    }

    const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : noFoundPoster;

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      date,
      poster,
      genres,
      vote: data.vote_average,
      popularity: Math.trunc(data.popularity) / 10,
    };
  };
}
