import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '../config.json';

const HeaderDiv = styled.div`
  margin-bottom: 1em;
`;

const Header = ({ updated }) => (
  <HeaderDiv>
    <h1>{config.pageTitle}</h1>

    <nav>
      <Link to="/">Sukupuu</Link>
      { ' ' }
      <Link to="/timeline">Aikajana</Link>
      { ' ' }
      <Link to="/places">Paikat</Link>
      { ' ' }
      <Link to="/persons">Henkilöhakemisto</Link>
    </nav>

    <div>Päivitetty: {updated}</div>
  </HeaderDiv>
);

export default Header;
