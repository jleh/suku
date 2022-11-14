import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import uniq from 'lodash/uniq';

import { getCoordinates } from '../../util';

import styles from './personMap.css';
import { useSelector } from 'react-redux';

const PersonMap = ({ events, places }) => {
  const { placesById } = useSelector((state) => state.places);

  if (!events) {
    return null;
  }

  const eventPlaces = uniq(
    events.map((event) => places.get(event.place.id)).filter((place) => place !== undefined)
  );

  if (eventPlaces.length === 0) {
    return null;
  }

  // Find some coordinates for places without those
  const getCoordinatesFromParent = (place) => {
    const parent = placesById.get(place.parent);
    if (parent.lat === null && parent.parent) return getCoordinatesFromParent(parent);
    else return { lat: parent.lat, lng: parent.lng };
  };

  eventPlaces.forEach((place) => {
    if (place.lat === null) {
      const { lat, lng } = getCoordinatesFromParent(place);
      place.lat = lat;
      place.lng = lng;
    }
  });

  let bounds;
  let center;
  let zoom;

  if (eventPlaces.length > 1) {
    bounds = latLngBounds(getCoordinates(eventPlaces[0]));
    eventPlaces.forEach((place) => bounds.extend(getCoordinates(place)));
  } else {
    center = getCoordinates(eventPlaces[0]);
    zoom = 12;
  }

  return (
    <div className={styles.personMap}>
      <Map bounds={bounds} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {eventPlaces
          .filter((place) => place.lng)
          .map((place) => (
            <Marker key={place.id} position={getCoordinates(place)}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
      </Map>
    </div>
  );
};

export default PersonMap;
