import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import format from 'date-fns/format';
import fiLocale from 'date-fns/locale/fi';

export const printBirth = child => (child.events.birth ? `* ${child.events.birth}` : null);
export const printDeath = child => (child.events.death ? `† ${child.events.death}` : null);

const getEvents = (person, placeId) => {
  if (!person || !person.events) {
    return [];
  }

  const events = [];
  const { personEvents } = person.events;

  if (personEvents) {
    personEvents.forEach((event) => {
      if (event.place.id === placeId) {
        events.push({
          name: person.name,
          id: person.id,
          type: event.type,
          event
        });
      }
    });
  }

  return [...events];
};

export const getPlaceEvents = (placeId, persons) => persons.reduce((events, person) => [
  ...events,
  ...getEvents(person, placeId)
], []);

export const renderAge = (birth, date) => ((birth === date || !date || !birth)
  ? null
  : distanceInWordsStrict(birth, date, { locale: fiLocale }));

export const createIdMap = (objects) => {
  const idMap = new Map();
  objects.forEach(object => idMap.set(object.id, object));
  return idMap;
};

export const createRefMap = (objects) => {
  const refMap = new Map();
  objects.forEach(object => refMap.set(object.handle, object));
  return refMap;
};

export const getCoordinates = place => [place.lat, place.lng];

export const createPlacesMap = (places) => {
  let placesMap = createIdMap(places);

  places.forEach((place) => {
    placesMap = new Map([...createIdMap(place.children), ...placesMap]);
    place.children.forEach((village) => {
      placesMap = new Map([...createIdMap(village.children), ...placesMap]);
      village.children.forEach((farm) => {
        placesMap = new Map([...createIdMap(farm.children), ...placesMap]);
      });
    });
  });

  return placesMap;
};

export const renderDate = date => date && (date.length === 4 ? date : format(date, 'DD.MM.YYYY'));
