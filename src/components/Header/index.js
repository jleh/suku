import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

import config from '../../../config.json';

const HeaderDiv = styled.div`
  margin-bottom: 1em;
`;

const Header = ({ updated }) => (
  <HeaderDiv>
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
  </HeaderDiv>
);

export default Header;
