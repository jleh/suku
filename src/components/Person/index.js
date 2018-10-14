import React from 'react';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import styles from './person.css';

import config from '../../../config.json';

import Family from '../Family';
import Sources from '../Sources';
import Wikipedia from '../Wikipedia';
import LinkedPerson from '../LinkedPerson';
import PersonEvents from '../PersonEvents';
import NavigationButtons from '../NavigationButtons';
import PersonDates from '../PersonDates';
import PersonMap from '../PersonMap';

const renderArms = coatOfArms => coatOfArms && (
  <div className={styles.coatOfArms}>
    <img src={`${config.coatOfArmsBasePath}/${coatOfArms}.svg`} alt="Suvun vaakuna" />
  </div>
);

const Person = ({
  persons, personRefs, places, match
}) => {
  const person = persons.get(match.params.id);

  if (!person.name) {
    return null;
  }

  const { personEvents, birthISO } = person.events;

  return (
    <div className={styles.person}>
      <div className={styles.header}>
        <div className={styles.picture}>
          {person.picture
            && <img src={`${config.picturesBasePath}/${person.picture}`} alt="Profile" />
          }
        </div>
        <div className={styles.info}>
          <div>
            <h2>{person.name}</h2>
            <PersonDates events={person.events} />
            <Wikipedia person={person} />
          </div>
          {renderArms(person.coatOfArms)}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.personEvents}>
          <h3>Elämä</h3>
          <PersonEvents events={personEvents} birth={birthISO} places={places} />
        </div>

        <div>
          <h3>Perhe</h3>
          <div className={styles.parents}>
            <Translate id="person.parents" />:
            <LinkedPerson personRef={person.father} persons={personRefs} />
            <LinkedPerson personRef={person.mother} persons={personRefs} />
          </div>

          <Family families={person.family} persons={personRefs} />
        </div>
      </div>

      <PersonMap events={person.events.personEvents} places={places} />
      <Sources sources={person.sources} />

      <NavigationButtons />
    </div>
  );
};

export default withRouter(Person);
