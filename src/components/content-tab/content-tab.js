import React from 'react';
import PropTypes from 'prop-types';
import CardsList from '../cards-list';
import AlertMessages from '../alert-messages';
import LoadSpinner from '../load-spinner';

export default function ContentTab(props) {
  const { loading, loadingError, currentSearch, totalResults, changePage, refreshRated, search, ...data } = props;

  if (loadingError) return <AlertMessages type="error" />;
  if (loading) return <LoadSpinner />;
  if (!totalResults && !loading && currentSearch && search) return <AlertMessages type="noResult" />;
  if (!(loading || loadingError)) {
    return (
      <CardsList
        changePage={changePage}
        currentSearch={currentSearch}
        totalResults={totalResults}
        refreshRated={refreshRated}
        {...data}
      />
    );
  }
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
