import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { renderAge, renderDate } from '../../util';

import styles from './personEvents.css';

const renderAgeOnEvent = (birth, event) => {
  if (!birth) {
    return null;
  }

  const age = event.type !== 'Birth' && renderAge(birth, event.date);

  if (age) {
    return age.replace('vuotta', 'v').replace('päivää', 'pv');
  }

  return null;
};

export default ({ events, birth }) => {
  if (!events) {
    return null;
  }

  const lineClass = (index, length) => (index === length - 1 ? styles.last : '');

  return (
    <div className={styles.timeline}>
      {events.map((event, index) => (
        <div key={event.id} className={styles.timelineRow}>
          <div className={styles.date}>
            <div>
              {renderDate(event.date)}
            </div>
            <div className={styles.age}>
              {renderAgeOnEvent(birth, event)}
            </div>
          </div>
          <div className={`${styles.line} ${lineClass(index, events.length)}`}>
            <div />
          </div>
          <div className={styles.timelineText}>
            <div>
              <Translate id={`events.${event.type}`} /> {event.description}
            </div>
            <div className={styles.place}>
              {event.place && (
                <Link to={`/place/${event.place.id}`}>{event.place.name}</Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>);
};
