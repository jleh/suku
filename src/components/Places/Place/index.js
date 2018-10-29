import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import withContext from '../../../context';

import { getPlaceEvents } from '../../../util';
import PlaceEvents from '../PlaceEvents';
import VillageList from './VillageList';
import PlaceMap from './PlaceMap';
import VillagePlaces from './VillagePlaces';
import ResidentsTimeline from '../ResidentTimeline';

const getParentPlace = (place, placesById) => {
  if (place.type === 'village') {
    return placesById.get(place.city);
  }
  if (place.type === 'farm') {
    return placesById.get(place.village);
  }
  if (place.type === 'building') {
    return placesById.get(place.farm);
  }
};

const Place = ({
  match, placesById, personList, personsById
}) => {
  const place = placesById.get(match.params.id);
  const placeEvents = getPlaceEvents(place.id, personList);
  const parentPlace = getParentPlace(place, placesById);

  return (
    <div>
      <h2>{place.name}</h2>

      {parentPlace && <Link to={`/place/${parentPlace.id}`}>{parentPlace.name}</Link>}

      <PlaceMap place={place} />

      {place.villages && <VillageList villages={place.villages} />}
      {place.type === 'village' && <VillagePlaces personList={personList} village={place} />}
      {(place.type === 'farm' || place.type === 'building') && (
        <div>
          <h4>Asukkaat</h4>
          <ResidentsTimeline placeEvents={placeEvents} personsById={personsById} />
        </div>
      )}

      <PlaceEvents placeEvents={placeEvents} />
    </div>
  );
};

export default withRouter(withContext(Place));
