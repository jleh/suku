import React from 'react';

const getEventsForYear = (events, year) =>
  events.filter((event) => event.start >= year && event.end <= year);

const WorldEvents = ({ year, worldEvents }) => (
  <div>
    {getEventsForYear(worldEvents, parseInt(year, 10)).map((event) => (
      <div key={`${event.name}-${event.start}`}>{event.name}</div>
    ))}
  </div>
);

export default WorldEvents;
