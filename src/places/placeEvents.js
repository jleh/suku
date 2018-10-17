import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';

import { renderDate } from '../util';

import styles from './places.css';

export default ({ placeEvents }) => (
  <table className={styles.placeEventsTable}>
    <tbody>
      {sortBy(placeEvents, 'event.date').map(event => (
        <tr key={`${event.event.id}-${event.id}-${event.type}`}>
          <td>
            <Link to={`/person/${event.id}`}>
              {event.name}
            </Link>
          </td>
          <td>
            {renderDate(event.event.date)}
          </td>
          <td>
            <Translate id={`events.${event.type}`} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
