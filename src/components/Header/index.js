import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import config from '../../../config.json';
import styles from './header.css';

const Header = ({ updated }) => (
  <div className={styles.header}>
    <h1>{config.pageTitle}</h1>

    <nav>
      <Link to="/">
        <Translate id="menu.ancestorTree" />
      </Link>
      { ' ' }
      <Link to="/timeline">
        <Translate id="menu.timeline" />
      </Link>
      { ' ' }
      <Link to="/places">
        <Translate id="menu.places" />
      </Link>
      { ' ' }
      <Link to="/persons">
        <Translate id="menu.personIndex" />
      </Link>
    </nav>

    <div><Translate id="updated" />: {updated}</div>
  </div>
);

export default Header;
