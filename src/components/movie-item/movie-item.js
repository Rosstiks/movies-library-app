import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

import './movie-item.css';
import MovieItemHeader from './__header';
import cutOverflowContent from '../../services/cut-overflow-content/cut-overflow-content';

export default class MovieItem extends React.Component {
  static defaultProps = {
    popularity: 0,
    overview: 'Overview not found',
  };

  static propTypes = {
    overview: PropTypes.string,
    popularity: PropTypes.number,
    id: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { id } = this.props;
    cutOverflowContent(id);
  }

  render() {
    const { overview, popularity, id, ...other } = this.props;

    return (
      <div className="movie-item">
        <MovieItemHeader {...other} />
        <p id={id} className="movie-item__overview">
          {overview}{' '}
        </p>
        <footer className="movie-item__footer">
          <Rate
            defaultValue={popularity}
            allowHalf
            count={10}
            style={{ fontSize: '1.3em', verticalAlign: 'middle', lineHeight: '46px' }}
          />
        </footer>
      </div>
    );
  }
}
