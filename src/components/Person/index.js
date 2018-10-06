import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import styles from './person.css';

import Family from '../Family';
import Sources from '../Sources';
import Wikipedia from '../Wikipedia';
import LinkedPerson from '../LinkedPerson';
import PersonEvents from '../PersonEvents';

const renderPlace = place => (place ? place.name : '');

const getYear = date => date.substring(date.length - 4);
const getAge = (date, birth) => (birth ? Number(getYear(date)) - Number(getYear(birth)) : null);
const renderAge = (date, birth) => (birth ? `${getAge(date, birth)} v` : null);

const Person = ({ persons, history, match }) => {
  const person = persons.find(p => p.id === match.params.id);

  if (!person.name) {
    return null;
  }

  const goBack = () => history.goBack();

  const {
    birth, birthPlace, death, deathPlace, personEvents, birthISO
  } = person.events;

  return (
    <div className={styles.person}>
      <h2>{person.name}</h2>

      {birth && <div>* {birth} {renderPlace(birthPlace)}</div>}
      {death && <div>† {death} {renderPlace(deathPlace)} {renderAge(death, birth)}</div>}

      <Wikipedia person={person} />

      <div className={styles.parent}>
        <Translate id="person.parents" />:
        <LinkedPerson personRef={person.father} persons={persons} />
        <LinkedPerson personRef={person.mother} persons={persons} />
      </div>

      <PersonEvents events={personEvents} birth={birthISO} />

      <Family families={person.family} persons={persons} />
      <Sources sources={person.sources} />

      <button type="button" onClick={goBack}>
        <Translate id="back" />
      </button>
      <Link to="/">
        <button type="button">
          <Translate id="frontPage" />
        </button>
      </Link>
    </div>
  );
};

export default withRouter(Person);
