import React from 'react';
import {
  Map, TileLayer, Marker, Popup
} from 'react-leaflet';
import { latLngBounds } from 'leaflet';
import uniq from 'lodash/uniq';

import { getCoordinates } from '../../util';

import styles from './personMap.css';

export default ({ events, places }) => {
  if (!events) {
    return null;
  }

  const eventPlaces = uniq(events
    .map(event => places.get(event.place.id))
    .filter(place => place !== undefined)
    .filter(place => place.lat !== null));

  if (eventPlaces.length === 0) {
    return null;
  }

  let bounds;
  let center;
  let zoom;

  if (eventPlaces.length > 1) {
    bounds = latLngBounds(getCoordinates(eventPlaces[0]));
    eventPlaces.forEach(place => bounds.extend(getCoordinates(place)));
  } else {
    center = getCoordinates(eventPlaces[0]);
    zoom = 12;
  }

  return (
    <div className={styles.personMap}>
      <Map bounds={bounds} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {eventPlaces.map(place => (
          <Marker key={place.id} position={getCoordinates(place)}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};
