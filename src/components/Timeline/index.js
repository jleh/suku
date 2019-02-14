import React from 'react';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import { Translate } from 'react-localize-redux';

import styles from './timeline.css';

import WorldEvents from '../WorldEvents';
import TimelineEvent from './TimelineEvent';

const getYear = date => date.substring(0, 4);
const getYears = events => uniq(events.map(event => getYear(event.date))).sort();

const personEventsReducer = (events, person) => {
  if (person.events.personEvents) {
    const personEvents = person.events.personEvents.map(event => Object.assign(event, { person }));
    return [...events, ...personEvents];
  }

  return events;
};

const Timeline = ({ personList, worldEvents }) => {
  if (worldEvents.length === 0) {
    return null;
  }

  const events = sortBy(personList
    .reduce(personEventsReducer, [])
    .filter(event => event.date !== undefined), 'date');
  const eventsByYear = groupBy(events, event => getYear(event.date));
  const years = getYears(events);

  return (
    <div>
      <h2><Translate id="menu.timeline" /></h2>
      {years.map(year => (
        <div key={year}>
          <h4>{year}</h4>
          <div className={styles.timelineEvents}>
            <div className={styles.familyEvents}>
              {eventsByYear[year].map(event => (
                <TimelineEvent key={`${event.id}-${event.person.id}`} event={event} />
              ))}
            </div>
            <div className={styles.worldEvents}>
              <WorldEvents year={year} worldEvents={worldEvents} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ persons, worldEvents }) => ({
  personList: persons.personList,
  worldEvents
});

export default connect(mapStateToProps)(Timeline);
