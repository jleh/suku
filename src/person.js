import React from 'react';
import { withRouter } from 'react-router-dom';

import Family from './family';
import Sources from './sources';

const renderPlace = place => (place ? place.name : '');

const getYear = date => date.substring(date.length - 4);
const getAge = (date, birth) => (birth ? Number(getYear(date)) - Number(getYear(birth)) : null);
const renderAge = (date, birth) => (birth ? `${getAge(date, birth)} v` : null);

const Person = ({ person, history }) => {
  if (!person.name) {
    return null;
  }

  const goBack = () => history.goBack();

  const {
    birth, birthPlace, death, deathPlace, causeOfDeath, occupations
  } = person.events;

  return (
    <div className="popup">
      <h2>{person.name}</h2>

      {birth && <div>* {birth} {renderPlace(birthPlace)}</div>}
      {death && <div>† {death} {renderPlace(deathPlace)} {renderAge(death, birth)}</div>}

      {person.wikipedia && <div><a href={person.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a></div>}

      <div className="occupations">
        {occupations && occupations.map(occupation => (
          <div key={occupation.$.id}>
            {occupation.description[0]} {occupation.date} <span className="place-name">{occupation.place && occupation.place.name}</span>
          </div>
        ))}
      </div>

      {causeOfDeath && <div>Kuolinsyy: {causeOfDeath}</div>}

      <Family families={person.family} />
      <Sources sources={person.sources} />

      <button type="button" onClick={goBack}>
        Takaisin
      </button>
    </div>
  );
};

export default withRouter(Person);
