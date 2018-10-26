import React from 'react';

const getEventsForYear = (events, year) => events
  .filter(event => event.start >= year && event.end <= year);

export default ({ year, worldEvents }) => (
  <div>
    {getEventsForYear(worldEvents.events, parseInt(year, 10)).map(event => (
      <div key={`${event.name}-${event.start}`}>
        {event.name}
      </div>
    ))}
  </div>
);
