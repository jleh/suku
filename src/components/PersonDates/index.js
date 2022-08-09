import React from 'react';

import { renderAge } from '../../util';

const renderPlace = (place) => (place ? place.name : '');

const PersonDates = ({ events }) => {
  const { birth, death, birthPlace, deathPlace, birthISO, deathISO } = events;

  return (
    <div>
      {birth && (
        <div>
          * {birth} {renderPlace(birthPlace)}
        </div>
      )}
      {death && (
        <div>
          † {death} {renderPlace(deathPlace)} {renderAge(deathISO, birthISO)}
        </div>
      )}
    </div>
  );
};

export default PersonDates;
