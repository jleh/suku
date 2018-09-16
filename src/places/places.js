import React from 'react';
import { Link } from 'react-router-dom';

export default ({ places }) => (
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
