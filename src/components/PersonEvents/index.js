import React from 'react';
import { Translate } from 'react-localize-redux';
import { format } from 'date-fns';

import { renderAge } from '../../util';

import styles from './personEvents.css';

const renderDate = date => date && (date.length === 4 ? date : format(date, 'DD.MM.YYYY'));

export default ({ events, birth }) => (
  <table className={styles.table}>
    <tbody>
      {events.map(event => (
        <tr key={event.id}>
          <td className={styles.date}>{renderDate(event.date)}</td>
          <td className={styles.age}>{event.type !== 'Birth' && renderAge(birth, event.date)}</td>
          <td><Translate id={`events.${event.type}`} /></td>
          <td>{event.description}</td>
          <td className={styles.place}>{event.place && event.place.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
