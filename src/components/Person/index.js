import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

const Person = () => {
  const { id } = useParams();
  const { personsById, personsByRef } = useSelector((state) => state.persons);
  const { placesById } = useSelector((state) => state.places);

  useEffect(() => window.scrollTo(0, 0));

  const person = personsById.get(id);

  if (!person?.name) {
    return (
      <div>
        <Translate id="person.notFound" />
      </div>
    );
  }

  const { events, name, coatOfArms, father, mother, family, sources, siblings } = person;
  const { personEvents, birthISO } = events;

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
          <PersonEvents events={personEvents} birth={birthISO} sources={sources} family={family} />
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
              <LinkedPerson key={sibling} personRef={sibling} persons={personsByRef} />
            ))}
            {siblings.length === 0 && '—'}
          </div>

          <Family families={family} persons={personsByRef} />

          {events.birthISO && events.deathISO && (
            <div>
              <h3>
                <Translate id="person.worldEvents" />
              </h3>
              <WorldEvents
                startYear={parseInt(events.birthISO.split('-')[0], 10)}
                endYear={parseInt(events.deathISO.split('-')[0], 10)}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <Link to={`/tree/${person.id}`}>
          <Translate id="person.familyTree" />
        </Link>
      </div>

      <PersonMap events={events.personEvents} places={placesById} />

      <Sources sources={sources} />

      <NavigationButtons />
    </div>
  );
};

export default Person;
