import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import PersonMap from '../PersonMap';
import CoatOfArms from './CoatOfArms';
import ProfilePicture from './ProfilePicture';

class Person extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      personsById, personsByRef, placesById, match
    } = this.props;

    const person = personsById.get(match.params.id);

    if (!person || !person.name) {
      return null;
    }

    const { personEvents, birthISO } = person.events;

    return (
      (
        <div className={styles.person}>
          <div className={styles.header}>
            <ProfilePicture person={person} />
            <div className={styles.info}>
              <div>
                <h2>{person.name}</h2>
                <PersonDates events={person.events} />
                <Wikipedia person={person} />
              </div>
              <CoatOfArms coatOfArms={person.coatOfArms} />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.personEvents}>
              <h3><Translate id="person.life" /></h3>
              <PersonEvents events={personEvents} birth={birthISO} places={placesById} />
            </div>

            <div>
              <h3><Translate id="person.family" /></h3>
              <div className={styles.parents}>
                <Translate id="person.parents" />:
                <LinkedPerson personRef={person.father} persons={personsByRef} />
                <LinkedPerson personRef={person.mother} persons={personsByRef} />
              </div>

              <Family families={person.family} persons={personsByRef} />
            </div>
          </div>

          <PersonMap events={person.events.personEvents} places={placesById} />
          <Sources sources={person.sources} />

          <NavigationButtons />
        </div>
      )
    );
  }
}

const mapStateToProps = ({ persons, places }) => ({
  personsById: persons.personsById,
  personsByRef: persons.personsByRef,
  placesById: places.placesById
});

export default withRouter(connect(mapStateToProps)(Person));
