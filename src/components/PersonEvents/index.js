import React from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { renderAge, renderDate, strToDate } from '../../util';

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

const PersonEvents = ({ events, birth, sources, family }) => {
  const { personsByRef } = useSelector((state) => state.persons);

  if (!events) {
    return null;
  }

  const lineClass = (index, length) => (index === length - 1 ? styles.last : '');

  const getSource = (srcRef) => {
    const source = sources.find((src) => src.ref === srcRef);
    return sources.indexOf(source) + 1;
  };

  console.log(family);

  const marriages = family
    .map((f) => ({ ...f.marriage, spouse: f.spouse }))
    .filter((marriage) => marriage !== undefined && marriage.date)
    .map((marriage) => ({
      ...marriage,
      name: personsByRef.get(marriage.spouse)?.name,
      id: personsByRef.get(marriage.spouse)?.id,
    }));

  const children = family
    .flatMap((f) => f.children)
    .map((child) => personsByRef.get(child))
    .filter((child) => child.events.birthISO)
    .map((child) => ({
      type: 'ChildBirth',
      name: child.name,
      id: child.id,
      date: child.events.birthISO,
    }));

  const combinedEvents = [...events, ...marriages, ...children].sort((a, b) => {
    const aDate = strToDate(a.date);
    const bDate = strToDate(b.date);

    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    if (bDate === undefined) return -1;
    return 0;
  });

  return (
    <div className={styles.timeline}>
      {combinedEvents.map((event, index) => (
        <div key={event.id} className={styles.timelineRow}>
          <div className={styles.date}>
            <div>{renderDate(event.date)}</div>
            <div className={styles.age}>{renderAgeOnEvent(birth, event)}</div>
          </div>
          <div className={`${styles.line} ${lineClass(index, combinedEvents.length)}`}>
            <div />
          </div>
          <div className={styles.timelineText}>
            <div>
              <Translate id={`events.${event.type}`} /> {event.description}{' '}
              {event.sources && <sup>[{event.sources.map(getSource).join(', ')}]</sup>}
            </div>
            {(event.type === 'ChildBirth' || event.type === 'Marriage') && (
              <div className={styles.linkedPersonName}>
                <Link to={`/person/${event.id}`}>{event.name}</Link>
              </div>
            )}
            <div className={styles.place}>
              {event.place && <Link to={`/place/${event.place.id}`}>{event.place.name}</Link>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonEvents;
