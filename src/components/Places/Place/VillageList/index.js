import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

export default ({ villages }) => (
  <div>
    <h3><Translate id="places.villages" /></h3>
    <ul>
      {villages.map(village => (
        <li key={village.id}>
          <Link to={`/place/${village.id}`}>{village.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);
