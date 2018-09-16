const formatDate = (date) => {
  const parts = date.split('-');

  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  return date;
};

const getEventType = (events, type) => events.find(event => event.type[0] === type);
const getEventsByType = (events, type) => events.filter(event => event.type[0] === type);
const getEventDate = event => (event && event.dateval ? formatDate(event.dateval[0].$.val) : '');
const getEventDescription = event => (event ? formatDate(event.description[0]) : '');

const getPlace = (ref, places) => {
  const place = places.find(p => p.$.handle === ref);
  const eventPlace = {
    id: place.$.id,
    name: place.pname[0].$.value
  };

  if (place.coord) {
    eventPlace.coordinates = {
      lng: place.coord[0].$.long,
      lat: place.coord[0].$.lat
    };
  }

  if (place.placeref) {
    const parent = getPlace(place.placeref[0].$.hlink, places);
    eventPlace.name = `${eventPlace.name}, ${parent.name}`;
  }

  return eventPlace;
};

const getEventPlace = (event, places) => {
  if (event && event.place && event.place[0]) {
    const eventPlace = getPlace(event.place[0].$.hlink, places);

    return eventPlace;
  }

  return '';
};

const getEvents = (events, type, places) => getEventsByType(events, type)
  .map(event => Object.assign(event, { place: getEventPlace(event, places) }))
  .map(event => Object.assign(event, { date: getEventDate(event) }));

const findEvents = (eventref, database) => {
  if (!eventref) {
    return {};
  }

  const places = database.places[0].placeobj;
  const events = eventref
    .map(event => event.$.hlink)
    .map(ref => database.events[0].event.find(event => event.$.handle === ref));

  const birth = getEventType(events, 'Birth');
  const death = getEventType(events, 'Death');

  return {
    birth: getEventDate(birth),
    birthPlace: getEventPlace(birth, places),
    death: getEventDate(death),
    deathPlace: getEventPlace(death, places),
    causeOfDeath: getEventDescription(getEventType(events, 'Cause Of Death')),
    occupations: getEvents(events, 'Occupation', places)
  };
};

module.exports = {
  findEvents,
  getEventsByType
};
