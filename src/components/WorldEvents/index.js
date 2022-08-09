import React from 'react';
import { useSelector } from 'react-redux';

import styles from './worldEvents.css';

const getEventsForYear = (events, year) =>
  events.filter((event) => event.start >= year && event.end <= year);

const getEventsForYears = (events, startYear, endYear) =>
  events.filter((event) => event.start >= startYear && event.end <= endYear);

const Event = ({ start, end, name, url }) => (
  <div>
    <span className={styles.eventYears}>{start === end ? start : `${start} — ${end}`}</span>{' '}
    {url ? (
      <a href={url} target="_blank" rel="noreferrer">
        {name}
      </a>
    ) : (
      name
    )}
  </div>
);

const WorldEvents = ({ year, startYear, endYear }) => {
  const worldEvents = useSelector((state) => state.worldEvents.events);

  if (startYear && endYear) {
    return (
      <div>
        {getEventsForYears(worldEvents, startYear, endYear).map((event) => (
          <Event
            key={`${event.name}-${event.start}`}
            start={event.start}
            end={event.end}
            name={event.name}
            url={event.url}
          />
        ))}
      </div>
    );
  }

  if (year) {
    return (
      <div>
        {getEventsForYear(worldEvents, parseInt(year, 10)).map((event) => (
          <div key={`${event.name}-${event.start}`}>{event.name}</div>
        ))}
      </div>
    );
  }

  return null;
};

export default WorldEvents;
