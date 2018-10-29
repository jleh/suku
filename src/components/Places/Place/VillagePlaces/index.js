import React from 'react';
import { Link } from 'react-router-dom';

import { getPlaceEvents } from '../../../../util';
import styles from './villagePlaces.css';

import PlaceEvents from '../../PlaceEvents';

export default ({ village, personList }) => (
  <div>
    {village.farms.map(farm => (
      <div key={farm.id}>
        <Link to={`/place/${farm.id}`}>
          <h3>{farm.name}</h3>
        </Link>
        <PlaceEvents placeEvents={getPlaceEvents(farm.id, personList)} />
        {farm.buildings.map(building => (
          <div className={styles.buildings} key={building.id}>
            <h4>{building.name}</h4>
            <PlaceEvents placeEvents={getPlaceEvents(building.id, personList)} />
          </div>
        ))}
      </div>
    ))}
  </div>
);
