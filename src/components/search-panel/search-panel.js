import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import './search-panel.css';

export default class SearchPanel extends React.Component {
  static propTypes = {
    newSearch: PropTypes.func.isRequired,
  };

  state = {
    inputValue: null,
  };

  // eslint-disable-next-line react/destructuring-assignment
  newRequest = debounce((value) => this.props.newSearch(1, value), 400);

  changeInputValue = (evt) => {
    this.setState({ inputValue: evt.target.value });
    this.newRequest(evt.target.value);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className="header">
        <Input onChange={this.changeInputValue} placeholder="Type to search..." value={inputValue} />
      </header>
    );
  }
}
