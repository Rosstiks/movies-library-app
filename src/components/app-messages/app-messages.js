import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

export default function AppMessages({ type }) {
  const messages = {
    noResult: 'No matches',
    error: 'Bad news',
    noRated: "It's empty here for now",
  };
  const descriptions = {
    noResult: 'Sorry, no results were found. Try to change your request.',
    error: 'Sorry, something went wrong. Try to reload the page and repeat.',
    noRated: 'Rate movies to add to the list',
  };
  const message = messages[type];
  const description = descriptions[type];
  return <Alert message={message} description={description} showIcon type="info" />;
}

AppMessages.propTypes = {
  type: PropTypes.string.isRequired,
};
