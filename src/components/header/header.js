import React from 'react';
import { Input } from 'antd';

import './header.css';

export default function Header() {
  return (
    <header className="header">
      <Input placeholder="Type to search..." />
    </header>
  );
}
