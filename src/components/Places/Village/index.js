import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import withContext from '../../../context';

import { getPlaceEvents } from '../../../util';

import PlaceEvents from '../PlaceEvents';
import VillageMap from './villageMap';

import styles from './village.css';

const Village = ({ match, personList, placesById }) => {
  const village = placesById.get(match.params.id);
  const city = placesById.get(village.city);

  return (
    <div>
      <h2>{village.name}</h2>
      <Link to={`/place/${city.id}`}>{city.name}</Link>

      {village.coordinates && <VillageMap village={village} />}
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
