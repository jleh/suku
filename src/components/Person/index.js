import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import styles from './person.css';

import Family from '../Family';
import Geni from '../Geni';
import Sources from '../Sources';
import Wikipedia from '../Wikipedia';
import LinkedPerson from '../LinkedPerson';
import PersonEvents from '../PersonEvents';
import NavigationButtons from '../NavigationButtons';
import PersonDates from '../PersonDates';
import PersonMap from '../PersonMap';
import CoatOfArms from './CoatOfArms';
import ProfilePicture from './ProfilePicture';
import WorldEvents from '../WorldEvents';

const Person = ({ personsById, personsByRef, placesById, match }) => {
  const person = personsById.get(match.params.id);

  if (!person?.name) {
    return null;
  }

  const { events, name, coatOfArms, father, mother, family, sources, siblings } = person;
  const { personEvents, birthISO } = events;

  useEffect(() => window.scrollTo(0, 0));

  return (
    <div className={styles.person}>
      <div className={styles.header}>
        <ProfilePicture person={person} />
        <div className={styles.info}>
          <div>
            <h2>{name}</h2>
            <PersonDates events={events} />
            <Geni person={person} />
            <Wikipedia person={person} />
          </div>
          <CoatOfArms coatOfArms={coatOfArms} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.personEvents}>
          <h3>
            <Translate id="person.life" />
          </h3>
          <PersonEvents events={personEvents} birth={birthISO} sources={sources} />
        </div>

        <div>
          <h3>
            <Translate id="person.family" />
          </h3>
          <div className={styles.parents}>
            <h4>
              <Translate id="person.parents" />:
            </h4>
            <LinkedPerson personRef={father} persons={personsByRef} />
            <LinkedPerson personRef={mother} persons={personsByRef} />
          </div>

          <div>
            <h4>
              <Translate id="family.siblings" />:
            </h4>
            {siblings.map((sibling) => (
              <LinkedPerson personRef={sibling} persons={personsByRef} />
            ))}
            {siblings.length === 0 && '—'}
          </div>

          <Family families={family} persons={personsByRef} />

          {events.birthISO && events.deathISO && (
            <div>
              <h3>Maailmalla tapahtui</h3>
              <WorldEvents
                startYear={parseInt(events.birthISO.split('-')[0], 10)}
                endYear={parseInt(events.deathISO.split('-')[0], 10)}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Link to={`/tree/${person.id}`}>Sukupuu</Link>
      </div>

      <PersonMap events={events.personEvents} places={placesById} />

      <Sources sources={sources} />

      <NavigationButtons />
    </div>
  );
};

const mapStateToProps = ({ persons, places }) => ({
  personsById: persons.personsById,
  personsByRef: persons.personsByRef,
  placesById: places.placesById,
});

export default withRouter(connect(mapStateToProps)(Person));
