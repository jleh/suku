import React from 'react';
import { withRouter } from 'react-router-dom';

import withContext from '../../../context';
import { getPlaceEvents } from '../../../util';
import createResidentList from './createResidentList';

import PlaceEvents from '../PlaceEvents';

const House = ({ match, personList, personsById, placesById }) => {
  const house = placesById.get(match.params.id);
  const placeEvents = getPlaceEvents(house.id, personList);
  const residentList = createResidentList(placeEvents, personsById);

  console.log(residentList);

  return (
    <div>
      <h2>{house.name}</h2>

      <PlaceEvents placeEvents={placeEvents} />
    </div>
  );
};

export default withRouter(withContext(House));
