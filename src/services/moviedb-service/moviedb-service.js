import { format } from 'date-fns';
import noFoundPoster from './no_image_poster.png';

export default class MovieDBService {
  _apiKey = 'api_key=b7473b579abba0475a9336164324a2c1';

  _apiBase = 'https://api.themoviedb.org/3';

  _imageBase = 'https://image.tmdb.org/t/p/w500';

  requestFromDB = async (request) => {
    const path = `${this._apiBase}${request}`;
    const response = await fetch(path);
    const data = await response.json();
    return data;
  };

  createGuestSession = async () => {
    const path = `${this._apiBase}/authentication/guest_session/new?${this._apiKey}`;
    const response = await fetch(path);
    const data = await response.json();
    return data.guest_session_id;
  };

  rateMovie = async (id, value, sessionID) => {
    const path = `${this._apiBase}/movie/${id}/rating?${this._apiKey}&guest_session_id=${sessionID}`;
    const paramsRequest = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ value }),
    };
    const response = await fetch(path, paramsRequest);
    const data = await response.json();
    return data;
  };

  searchMovies = async (page, keyword, rated, sessionID) => {
    const path = rated
      ? `/guest_session/${sessionID}/rated/movies?${this._apiKey}&page=${page}`
      : `/search/movie?${this._apiKey}&query=${keyword}&page=${page}`;
    const response = await this.requestFromDB(path);
    const data = response.results.map((el) => this.createDataMovie(el));
    return {
      data,
      currentPage: response.page,
      totalResults: response.total_results,
    };
  };

  getGenresList = async () => {
    const path = `/genre/movie/list?${this._apiKey}`;
    const genresList = await this.requestFromDB(path);
    return genresList.genres.reduce((acc, el) => {
      acc[el.id] = el.name;
      return acc;
    }, {});
  };

  createDataMovie = (data) => {
    let date;
    try {
      date = format(new Date(data.release_date), 'MMM d, y');
    } catch (err) {
      date = 'No date info';
    }

    const poster = data.poster_path ? `${this._imageBase}${data.poster_path}` : noFoundPoster;

    return {
      id: data.id,
      title: data.title,
      overview: data.overview,
      date,
      poster,
      genresIds: data.genre_ids,
      globalRate: data.vote_average,
      userRate: data.rating || 0,
    };
  };
}
