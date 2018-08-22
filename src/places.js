import React from 'react';
import uniq from 'lodash/uniq';

const getEvents = (data) => {
  if (!data || !data.events) {
    return [];
  }

  const events = [];

  if (data.events.birthPlace) {
    events.push({
      name: data.name,
      place: data.events.birthPlace
    });
  }
  if (data.events.deathPlace) {
    events.push({
      name: data.name,
      place: data.events.deathPlace
    });
  }

  if (data.events.occupations) {
    data.events.occupations.forEach((event) => {
      if (event.place !== '') {
        events.push({
          name: data.name,
          place: event.place
        });
      }
    });
  }

  return [
    ...events,
    ...getEvents(data.parents[0]),
    ...getEvents(data.parents[1])
  ];
};

const getPlaces = (data) => {
  const places = new Map();

  getEvents(data).forEach((event) => {
    const place = places.get(event.place.name);

    if (!place) {
      places.set(event.place.name, [event.name]);
    } else {
      place.push(event.name);
    }
  });

  return [...places];
};

export default ({ data }) => (
  <div>
    {getPlaces(data).map(place => (
      <div key={place[0]}>
        <h3>{place[0]}</h3>
        {uniq(place[1]).map(name => <div key={name}>{name}</div>)}
      </div>
    ))}
  </div>
);
