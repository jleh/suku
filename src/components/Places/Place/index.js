import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import withContext from '../../../context';

import { getPlaceEvents } from '../../../util';
import PlaceEvents from '../PlaceEvents';
import VillageList from './VillageList';
import PlaceMap from './PlaceMap';
import VillagePlaces from './VillagePlaces';
import ResidentsTimeline from '../ResidentTimeline';

import styles from './place.css';

const getParentPlace = (place, placesById) => place.parent && placesById.get(`P${place.parent.toString().padStart(4, 0)}`);

const Place = ({
  match, placesById, personList, personsById
}) => {
  const place = placesById.get(match.params.id);

  if (!place) {
    return null;
  }

  const placeEvents = getPlaceEvents(place.id, personList);
  const parentPlace = getParentPlace(place, placesById);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{place.name}</h2>
      <span className={styles.parentLink}>
        {parentPlace && <Link to={`/place/${parentPlace.id}`}>{parentPlace.name}</Link>}
      </span>

      <PlaceMap place={place} />

      {place.type === 'city' && <VillageList villages={place.children} />}
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
