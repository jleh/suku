import React from 'react';

import { renderAge } from '../../util';

const renderPlace = place => (place ? place.name : '');

const PersonDates = ({ events }) => {
  const {
    birth, death, birthPlace, deathPlace
  } = events;

  return (
    <div>
      {birth && <div>* {birth} {renderPlace(birthPlace)}</div>}
      {death && <div>† {death} {renderPlace(deathPlace)} {renderAge(death, birth)}</div>}
    </div>
  );
};

export default PersonDates;
