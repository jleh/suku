import React from 'react';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import styles from './person.css';

import Family from '../Family';
import Sources from '../Sources';
import Wikipedia from '../Wikipedia';
import LinkedPerson from '../LinkedPerson';
import PersonEvents from '../PersonEvents';
import NavigationButtons from '../NavigationButtons';
import PersonDates from '../PersonDates';

const renderArms = coatOfArms => coatOfArms && (
  <div className={styles.coatOfArms}>
    <img src={`http://karttalehtinen.fi/suku/vaakunat/${coatOfArms}.svg`} alt="Suvun vaakuna" />
  </div>
);

const Person = ({ persons, match }) => {
  const person = persons.find(p => p.id === match.params.id);

  if (!person.name) {
    return null;
  }

  const { personEvents, birthISO } = person.events;

  return (
    <div className={styles.person}>
      <div className={styles.header}>
        <div className={styles.picture}>
          {person.picture
            && <img src={`http://karttalehtinen.fi/suku/kuvat/${person.picture}`} alt="Profile" />
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
          <PersonEvents events={personEvents} birth={birthISO} />
        </div>

        <div>
          <h3>Perhe</h3>
          <div className={styles.parents}>
            <Translate id="person.parents" />:
            <LinkedPerson personRef={person.father} persons={persons} />
            <LinkedPerson personRef={person.mother} persons={persons} />
          </div>

          <Family families={person.family} persons={persons} />
        </div>
      </div>

      <Sources sources={person.sources} />

      <NavigationButtons />
    </div>
  );
};

export default withRouter(Person);
