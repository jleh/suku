import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

export default ({ placeEvents }) => (
  <div>
    {placeEvents.map(event => (
      <div key={`${event.name}-${event.type}`}>
        <Link to={`/person/${event.id}`}>{event.name}</Link> <Translate id={`events.${event.type}`} />
      </div>
    ))}
  </div>
);
