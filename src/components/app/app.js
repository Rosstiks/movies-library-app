import React from 'react';
import { Tabs } from 'antd';
import './app.scss';
import MovieDBService from '../../services/moviedb-service/moviedb-service';
import cutOverflowContent from '../../utils/cut-overflow-content/cut-overflow-content';
import ContentTab from '../content-tab';
import SearchPanel from '../search-panel';
import { GenresProvider } from '../../genres-context';

export default class App extends React.Component {
  movieDBService = new MovieDBService();

  state = {
    data: [],
    ratedData: [],
    currentSearch: '',
    currentPageSearch: 1,
    currentPageRated: 1,
    totalResultsSearch: 0,
    totalResultsRated: 0,
    loading: false,
    loadingError: false,
    sessionID: null,
  };

  componentDidMount() {
    const { createGuestSession, getGenresList } = this.movieDBService;
    createGuestSession().then((sessionID) => this.setState({ sessionID }));
    getGenresList().then((list) => {
      this.genresList = list;
    });
  }

  getData = async (page, keyword, rated, sessionID) => {
    if (keyword === '' && !rated) {
      this.setState({ data: [], currentSearch: '', totalResultsSearch: 0, loading: false });
      return;
    }
    try {
      const { searchMovies } = this.movieDBService;
      this.setState({ loading: true, loadingError: false });
      const responseMovies = await searchMovies(page, keyword, rated, sessionID);
      const { data, currentPage, totalResults } = responseMovies;
      this.setState((prevState) => ({
        data: rated ? prevState.data : data,
        ratedData: rated ? data : prevState.ratedData,
        loading: false,
        currentSearch: rated ? prevState.currentSearch : keyword,
        currentPageSearch: rated ? prevState.currentPageSearch : currentPage,
        currentPageRated: rated ? currentPage : prevState.currentPageRated,
        totalResultsSearch: rated ? prevState.totalResultsSearch : totalResults,
      }));
    } catch (err) {
      this.setState({ loadingError: true, loading: false });
    }
  };

  refreshRated = async () => {
    const { searchMovies } = this.movieDBService;
    const { sessionID, currentPageRated } = this.state;
    const ratedData = await searchMovies(currentPageRated, null, true, sessionID);
    this.setState({
      ratedData: ratedData.data,
      totalResultsRated: ratedData.totalResults,
    });
  };

  changePageSearch = (page) => {
    const { currentSearch } = this.state;
    this.getData(page, currentSearch);
  };

  changePageRated = (page) => {
    const { sessionID } = this.state;
    this.getData(page, null, true, sessionID);
  };

  render() {
    const { TabPane } = Tabs;
    const { data, ratedData, currentPageSearch, currentPageRated, totalResultsSearch, totalResultsRated, ...params } =
      this.state;
    const checkRatedData = [...data];
    checkRatedData.forEach((searchEl) => {
      ratedData.forEach((el) => {
        if (searchEl.id === el.id) {
          // eslint-disable-next-line no-param-reassign
          searchEl.userRate = el.userRate;
        }
      });
    });

    return (
      <GenresProvider value={this.genresList}>
        <div className="container">
          <Tabs
            defaultActiveKey="search"
            onChange={() => setTimeout(() => cutOverflowContent('.movie-item__overview'), 100)}
          >
            <TabPane tab="Search" key="search" forceRender>
              <SearchPanel newSearch={this.getData} />
              <ContentTab
                search
                refreshRated={this.refreshRated}
                data={checkRatedData}
                totalResults={totalResultsSearch}
                currentPage={currentPageSearch}
                changePage={this.changePageSearch}
                {...params}
              />
            </TabPane>
            <TabPane tab="Rated" key="rated">
              <ContentTab
                refreshRated={this.refreshRated}
                data={ratedData}
                totalResults={totalResultsRated}
                currentPage={currentPageRated}
                changePage={this.changePageRated}
                {...params}
              />
            </TabPane>
          </Tabs>
        </div>
      </GenresProvider>
    );
  }
}
