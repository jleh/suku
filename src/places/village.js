import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';

import withContext from '../context';

import { getPlaceEvents, getCoordinates } from '../util';
import PlaceEvents from './placeEvents';

import styles from './village.css';

const renderMap = village => (
  <div className={styles.map}>
    <Map center={getCoordinates(village)} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {village.farms.filter(farm => farm.coordinates !== null).map(farm => (
        <Marker key={farm.id} position={getCoordinates(farm)} />
      ))}
    </Map>
  </div>
);

const Village = ({ match, personList, places }) => {
  const village = places
    .reduce((villages, place) => [...villages, ...place.villages], [])
    .find(v => v.id === match.params.id);

  return (
    <div>
      <h2>{village.name}</h2>
      {village.coordinates && renderMap(village)}
      {village.farms.map(farm => (
        <div key={farm.id}>
          <h3>{farm.name}</h3>
          <PlaceEvents placeEvents={getPlaceEvents(farm.id, personList)} />
          {farm.buildings.map(building => (
            <div className={styles.buildings} key={building.id}>
              <h4>{building.name}</h4>
              <PlaceEvents placeEvents={getPlaceEvents(building.id, personList)} />
            </div>
          ))}
        </div>
      ))}
      <div className={styles.events}>
        <PlaceEvents placeEvents={getPlaceEvents(village.id, personList)} />
      </div>
    </div>
  );
};

export default withRouter(withContext(Village));
