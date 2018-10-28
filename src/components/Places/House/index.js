import React from 'react';
import { withRouter } from 'react-router-dom';

import withContext from '../../../context';
import { getPlaceEvents } from '../../../util';
import createResidentList from './createResidentList';

import PlaceEvents from '../PlaceEvents';
import ResidentTimeline from './ResidentTimeline';

const House = ({
  match, personList, personsById, placesById
}) => {
  const house = placesById.get(match.params.id);
  const placeEvents = getPlaceEvents(house.id, personList);
  const residentList = createResidentList(placeEvents, personsById);

  return (
    <div>
      <h2>{house.name}</h2>

      <ResidentTimeline residents={residentList} />
      <PlaceEvents placeEvents={placeEvents} />
    </div>
  );
};

export default withRouter(withContext(House));
