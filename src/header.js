import React from 'react';
import { Link } from 'react-router-dom';

import config from '../config.json';

const Header = ({ updated }) => (
  <div>
    <h1>{config.pageTitle}</h1>

    <nav>
      <Link to="/">Sukupuu</Link>
      <Link to="/timeline">Aikajana</Link>
      <Link to="/places">Paikat</Link>
    </nav>

    <div>Päivitetty: {updated}</div>
  </div>
);

export default Header;
