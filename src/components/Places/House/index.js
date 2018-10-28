import React from 'react';
import { withRouter } from 'react-router-dom';

import withContext from '../../../context';
import { getPlaceEvents } from '../../../util';

import PlaceEvents from '../PlaceEvents';

const House = ({ match, personList, placesById }) => {
  const house = placesById.get(match.params.id);

  return (
    <div>
      <h2>{house.name}</h2>

      <PlaceEvents placeEvents={getPlaceEvents(house.id, personList)} />
    </div>
  );
};

export default withRouter(withContext(House));
