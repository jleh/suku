import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import sortBy from 'lodash/sortBy';

const PlaceNode = ({ place }) => {
  const label = `${place.name}${place.grampsType ? ` (${place.grampsType})` : ''}`;
  const children = sortBy(place.children || [], 'name');

  return (
    <li>
      <Link to={`/place/${place.id}`}>{label}</Link>
      {children.length > 0 && (
        <ul>
          {children.map((child) => (
            <PlaceNode key={child.id} place={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Places = () => {
  const { places } = useSelector((state) => state.places);
  const roots = sortBy(places || [], 'name');

  return (
    <div>
      <h2>
        <Translate id="menu.places" />
      </h2>

      <ul>
        {roots.map((place) => (
          <PlaceNode key={place.id} place={place} />
        ))}
      </ul>
    </div>
  );
};

export default Places;
