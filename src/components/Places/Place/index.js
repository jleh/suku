import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getPlaceEvents } from '../../../util';
import PlaceEvents from '../PlaceEvents';
import VillageList from './VillageList';
import PlaceMap from './PlaceMap';
import VillagePlaces from './VillagePlaces';
import ResidentsTimeline from '../ResidentTimeline';
import Sources from '../../Sources';

import styles from './place.css';

const getParentPlace = (place, placesById) =>
  place.parent && placesById.get(`P${place.parent.toString().padStart(4, 0)}`);

const Place = () => {
  const { id } = useParams();

  const { placesById } = useSelector((state) => state.places);
  const { personList, personsById } = useSelector((state) => state.persons);

  const place = placesById.get(id);

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

      <div className={styles.description}>
        {place.text.split('\n').map((text, i) => (
          <p key={i}>{text}</p>
        ))}
        {place.sources.length !== 0 && <Sources sources={place.sources} />}
      </div>

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

export default Place;
