import React from 'react';
import { Link } from 'react-router-dom';

import config from '../config.json';

const Header = () => (
  <div>
    <h1>{config.pageTitle}</h1>

    <nav>
      <Link to="/">Sukupuu</Link>
      <Link to="/timeline">Aikajana</Link>
      <Link to="/places">Paikat</Link>
    </nav>
  </div>
);

export default Header;
