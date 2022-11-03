import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import sortBy from 'lodash/sortBy';

const Places = () => {
  const { places } = useSelector((state) => state.places);
  return (
    <div>
      <h2>
        <Translate id="menu.places" />
      </h2>
      {sortBy(places, 'name').map((place) => (
        <div key={place.id}>
          <Link to={`/place/${place.id}`}>{place.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Places;
