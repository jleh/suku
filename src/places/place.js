import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import { getPlaceEvents } from '../util';
import PlaceEvents from './placeEvents';

const Place = ({ match, places, persons }) => {
  const place = places.find(p => p.id === match.params.id);

  return (
    <div>
      <h2>{place.name}</h2>
      <h3><Translate id="places.villages" /></h3>
      <ul>
        {place.villages.map(village => (
          <li key={village.id}>
            <Link to={`/village/${village.id}`}>{village.name}</Link>
          </li>
        ))}
      </ul>
      <PlaceEvents placeEvents={getPlaceEvents(place.id, persons)} />
    </div>
  );
};

export default withRouter(Place);
