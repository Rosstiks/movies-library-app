import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

export default function ItemRate({ userRate, changeRate }) {
  return (
    <Rate
      onChange={(value) => changeRate(value)}
      defaultValue={userRate}
      allowHalf
      count={10}
      style={{ fontSize: '1.2em', verticalAlign: 'middle', lineHeight: '46px' }}
    />
  );
}

ItemRate.propTypes = {
  userRate: PropTypes.number,
  changeRate: PropTypes.func.isRequired,
};

ItemRate.defaultProps = {
  userRate: 0,
};
