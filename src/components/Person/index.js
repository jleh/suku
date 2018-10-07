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

const Person = ({ persons, match }) => {
  const person = persons.find(p => p.id === match.params.id);

  if (!person.name) {
    return null;
  }

  const { personEvents, birthISO } = person.events;

  return (
    <div className={styles.person}>
      <h2>{person.name}</h2>

      <PersonDates events={person.events} />

      <Wikipedia person={person} />

      <div className={styles.parents}>
        <Translate id="person.parents" />:
        <LinkedPerson personRef={person.father} persons={persons} />
        <LinkedPerson personRef={person.mother} persons={persons} />
      </div>

      <PersonEvents events={personEvents} birth={birthISO} />

      <Family families={person.family} persons={persons} />
      <Sources sources={person.sources} />

      <NavigationButtons />
    </div>
  );
};

export default withRouter(Person);
