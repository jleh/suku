import React from 'react';
import { sortBy } from 'lodash';

const toSortDate = (textDate) => {
  const date = textDate.replace(/\?/g, '0');

  if (date.length === 10) {
    const fields = date.split('.');
    return `${fields[2]}-${fields[1]}-${fields[0]}`;
  }

  return date;
};

const getEvents = (data) => {
  if (!data || !data.events) {
    return [];
  }

  const events = [];

  if (data.events.birth) {
    events.push({
      text: `${data.name} syntyi`,
      sortDate: toSortDate(data.events.birth),
      date: data.events.birth,
    });
  }

  if (data.events.death) {
    events.push({
      text: `${data.name} kuoli`,
      sortDate: toSortDate(data.events.death),
      date: data.events.death,
    });
  }

  return [
    ...events,
    ...getEvents(data.parents[0]),
    ...getEvents(data.parents[1]),
  ];
};

const Timeline = ({ data }) => {
  const events = sortBy(getEvents(data), 'sortDate');

  return (
    <div>
      <h2>Aikajana</h2>
      {events.map(event => (
        <div key={`${event.date}-${event.text}`}>
          <div className="timeline-date">{event.date}</div>
          <div className="timeline-text">{event.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
