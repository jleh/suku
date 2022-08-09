import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import styles from './timeline.css';

const TimelineEvents = ({ event }) => (
  <div>
    <div className="timeline-text">
      <Link to={`/person/${event.person.id}`}>{event.person.name}</Link>{' '}
      <Translate id={`events.${event.type}`} /> {event.description}{' '}
      <span className={styles.eventPlace}>{event.place && event.place.name}</span>
    </div>
  </div>
);

export default TimelineEvents;
