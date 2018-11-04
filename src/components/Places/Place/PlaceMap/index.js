import React from 'react';
import { latLngBounds } from 'leaflet';
import {
  Map, TileLayer, Popup, CircleMarker
} from 'react-leaflet';

import { getCoordinates } from '../../../../util';
import { getSubPlaces, markerColor } from './utils';

import styles from './placeMap.css';

export default ({ place }) => {
  let bounds;
  let center;
  let zoom;

  if (!place.lat && !place.lon) {
    return null;
  }

  const subPlaces = getSubPlaces(place);
  const subPlacesWithCoordinates = subPlaces.filter(subPlace => subPlace.lat);

  if (subPlacesWithCoordinates.length > 1) {
    bounds = latLngBounds(getCoordinates(place));
    subPlacesWithCoordinates.forEach(subPlace => bounds.extend(getCoordinates(subPlace)));
  } else {
    center = getCoordinates(place);
    zoom = 12;
  }

  return (
    <div className={styles.map}>
      <Map bounds={bounds} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {[place, ...subPlacesWithCoordinates].map(p => (
          <CircleMarker
            key={p.id}
            center={getCoordinates(p)}
            color={markerColor(p)}
            fill={markerColor(p)}
          >
            <Popup>{p.name}</Popup>
          </CircleMarker>
        ))}
      </Map>
    </div>
  );
};
