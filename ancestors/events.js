const { findCitationAndSource } = require('./sources');

const formatDate = (date) => {
  const parts = date.split('-');

  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  return date;
};

const getEventType = (events, type) => events.find((event) => event.type[0] === type);
const getEventsByType = (events, type) => events.filter((event) => event.type[0] === type);
const getEventDate = (event) => {
  if (event && event.dateval) return formatDate(event.dateval[0].$.val);
  return '';
};

const getPlace = (ref, places) => {
  const place = places.find((p) => p.$.handle === ref);
  const eventPlace = {
    id: place.$.id,
    name: place.pname[0].$.value,
  };

  if (place.coord) {
    eventPlace.coordinates = {
      lng: place.coord[0].$.long,
      lat: place.coord[0].$.lat,
    };
  }

  if (place.placeref) {
    const parent = getPlace(place.placeref[0].$.hlink, places);
    eventPlace.name = `${eventPlace.name}, ${parent.name}`;

    // Finland is the primary country for persons
    // so naming it will be redundant.
    eventPlace.name = eventPlace.name.replace(', Suomi', '');
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

const findEvents = (eventref, database) => {
  if (!eventref) {
    return {};
  }

  const places = database.places[0].placeobj;
  const events = eventref
    .map((event) => event.$.hlink)
    .map((ref) => database.events[0].event.find((event) => event.$.handle === ref));

  const birth = getEventType(events, 'Birth');
  const death = getEventType(events, 'Death');

  const personEvents = events.map((event) => {
    const sourceRefs = event.citationref?.map((ref) => ref.$.hlink);
    const sourceObjects = sourceRefs
      ? sourceRefs.map((ref) => findCitationAndSource(ref, database))
      : [];

    return {
      id: event.$.id,
      type: event.type[0],
      date: event.dateval && event.dateval[0].$.val,
      place: getEventPlace(event, places),
      description: event.description && event.description[0],
      sources: sourceRefs,
      sourceObjects,
    };
  });

  return {
    personEvents,
    birth: getEventDate(birth),
    birthISO: birth && birth.dateval && birth.dateval[0].$.val,
    birthPlace: getEventPlace(birth, places),
    death: getEventDate(death),
    deathPlace: getEventPlace(death, places),
    deathISO: death && death.dateval && death.dateval[0].$.val,
  };
};

const findEvent = (eventref, database) => {
  if (!eventref) {
    return undefined;
  }

  const places = database.places[0].placeobj;
  const events = eventref
    .map((event) => event.$.hlink)
    .map((ref) => database.events[0].event.find((event) => event.$.handle === ref))
    .map((event) => {
      const sourceRefs = event.citationref?.map((ref) => ref.$.hlink);

      return {
        id: event.$.id,
        type: event.type[0],
        date: event.dateval && event.dateval[0].$.val,
        place: getEventPlace(event, places),
        description: event.description && event.description[0],
        sources: sourceRefs,
        sourceObjects: sourceRefs
          ? sourceRefs.map((ref) => findCitationAndSource(ref, database))
          : [],
      };
    });

  return events;
};

module.exports = {
  findEvents,
  findEvent,
  getEventsByType,
};
