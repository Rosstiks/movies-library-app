import React from 'react';
import PropTypes from 'prop-types';
import CardsList from '../cards-list';
import AppMessages from '../app-messages';
import LoadSpinner from '../load-spinner';

export default function ContentTab(props) {
  const { loading, loadingError, currentSearch, totalResults, changePage, refreshRated, search, ...data } = props;
  const contentData = (
    <CardsList
      changePage={changePage}
      currentSearch={currentSearch}
      totalResults={totalResults}
      refreshRated={refreshRated}
      {...data}
    />
  );
  let noResults = null;
  if (search) {
    noResults = !totalResults && !loading && currentSearch ? <AppMessages type="noResult" /> : null;
  }
  const error = loadingError ? <AppMessages type="error" /> : null;
  const spinner = loading ? <LoadSpinner /> : null;
  const content = !(loading || loadingError) ? contentData : null;
  return (
    <>
      {noResults}
      {error}
      {spinner}
      {content}
    </>
  );
}

ContentTab.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingError: PropTypes.bool.isRequired,
  currentSearch: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  refreshRated: PropTypes.func.isRequired,
  search: PropTypes.bool,
};

ContentTab.defaultProps = {
  currentSearch: '',
  search: false,
};
