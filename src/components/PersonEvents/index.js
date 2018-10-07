import React from 'react';
import { Translate } from 'react-localize-redux';
import { format } from 'date-fns';

import { renderAge } from '../../util';

import styles from './personEvents.css';

const renderDate = date => date && (date.length === 4 ? date : format(date, 'DD.MM.YYYY'));
const renderAgeOnEvent = (birth, event) => {
  if (!birth) {
    return null;
  }

  return event.type !== 'Birth'
    && renderAge(birth, event.date)
      .replace('vuotta', 'v')
      .replace('päivää', 'pv');
};

export default ({ events, birth }) => {
  if (!events) {
    return null;
  }

  return (
    <table className={styles.table}>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td className={styles.date}>{renderDate(event.date)}</td>
            <td className={styles.age}>{renderAgeOnEvent(birth, event)}</td>
            <td><Translate id={`events.${event.type}`} /></td>
            <td>{event.description}</td>
            <td className={styles.place}>{event.place && event.place.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
