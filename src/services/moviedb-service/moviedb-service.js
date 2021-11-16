export default class MovieDBService {
  _apiKey = 'api_key=b7473b579abba0475a9336164324a2c1';

  _apiBase = 'https://api.themoviedb.org/3';

  requestFromDB = async (request) => {
    const response = await fetch(`${this._apiBase}${request}`);
    // eslint-disable-next-line no-return-await
    return await response.json();
  };

  searchMovies = async (keyword) => {
    const data = await this.requestFromDB(`/search/movie?${this._apiKey}&query=${keyword}`);
    return data.results;
  };

  getActualGenresList = async () => {
    const genresList = await this.requestFromDB(`/genre/movie/list?${this._apiKey}`);
    return genresList.genres;
  };
}
