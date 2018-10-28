import React from 'react';
import { latLngBounds } from 'leaflet';
import {
  Map, TileLayer, Marker, Popup
} from 'react-leaflet';

import { getCoordinates } from '../../../util';

import styles from './village.css';

export default ({ village }) => {
  let bounds;
  let center;
  let zoom;

  const farmsWithCoordinates = village.farms.filter(farm => farm.coordinates);

  if (farmsWithCoordinates.length > 0) {
    bounds = latLngBounds(getCoordinates(village));
    farmsWithCoordinates.forEach(place => bounds.extend(getCoordinates(place)));
  } else {
    center = getCoordinates(village);
    zoom = 12;
  }

  return (
    <div className={styles.map}>
      <Map bounds={bounds} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {village.farms.filter(farm => farm.coordinates !== null).map(farm => (
          <Marker key={farm.id} position={getCoordinates(farm)}>
            <Popup>{farm.name}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
};
