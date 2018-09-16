import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { getPlaceEvents } from '../util';
import PlaceEvents from './placeEvents';

const VillageEvents = styled.div`
  margin-top: 1em;
`;

const MapContainer = styled.div`
  height: 25em;
  width: 100%;
`;

const Buildings = styled.div`
  margin-left: 1em;
`;

const getCoordinates = place => [
  parseFloat(place.coordinates.lat.replace(',', '.')),
  parseFloat(place.coordinates.lng.replace(',', '.'))
];

const renderMap = village => (
  <MapContainer>
    <Map center={getCoordinates(village)} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {village.farms.filter(farm => farm.coordinates !== null).map(farm => (
        <Marker position={getCoordinates(farm)} />
      ))}
    </Map>
  </MapContainer>
);

const Village = ({ match, persons, places }) => {
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
          <PlaceEvents placeEvents={getPlaceEvents(farm.id, persons)} />
          {farm.buildings.map(building => (
            <Buildings key={building.id}>
              <h4>{building.name}</h4>
              <PlaceEvents placeEvents={getPlaceEvents(building.id, persons)} />
            </Buildings>
          ))}
        </div>
      ))}
      <VillageEvents>
        <PlaceEvents placeEvents={getPlaceEvents(village.id, persons)} />
      </VillageEvents>
    </div>
  );
};

export default withRouter(Village);
