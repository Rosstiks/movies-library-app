import React from 'react';
import { Spin } from 'antd';
import './load-spinner.css';

export default function LoadSpinner() {
  return <Spin className="load-spinner" size="large" />;
}
