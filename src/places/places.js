import React from 'react';
import { Link } from 'react-router-dom';

import withContext from '../context';

const Places = ({ places }) => (
  <div>
    <h2>Paikat</h2>
    {places.map(place => (
      <div key={place.id}>
        <Link to={`/place/${place.id}`}>
          {place.name}
        </Link>
      </div>
    ))}
  </div>
);

export default withContext(Places);
