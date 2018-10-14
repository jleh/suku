import { distanceInWordsStrict } from 'date-fns';
import fiLocale from 'date-fns/locale/fi';

export const printBirth = child => (child.events.birth ? `* ${child.events.birth}` : null);
export const printDeath = child => (child.events.death ? `† ${child.events.death}` : null);

const getEvents = (data, placeId) => {
  if (!data || !data.events) {
    return [];
  }

  const events = [];
  const { birthPlace, deathPlace, occupations } = data.events;

  if (birthPlace && birthPlace.id === placeId) {
    events.push({
      name: data.name,
      id: data.id,
      type: 'birth'
    });
  }
  if (deathPlace && deathPlace.id === placeId) {
    events.push({
      name: data.name,
      id: data.id,
      type: 'death'
    });
  }

  if (occupations) {
    occupations.forEach((event) => {
      if (event.place.id === placeId) {
        events.push({
          name: data.name,
          id: data.id,
          type: 'occupation'
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

export const renderAge = (birth, date) => ((birth === date || !date)
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

export const getCoordinates = place => [
  parseFloat(place.coordinates.lat.replace(',', '.')),
  parseFloat(place.coordinates.lng.replace(',', '.'))
];

export const createPlacesMap = (places) => {
  let placesMap = createIdMap(places);

  places.forEach((place) => {
    placesMap = new Map([...createIdMap(place.villages), ...placesMap]);
    place.villages.forEach((village) => {
      placesMap = new Map([...createIdMap(village.farms), ...placesMap]);
      village.farms.forEach((farm) => {
        placesMap = new Map([...createIdMap(farm.buildings), ...placesMap]);
      });
    });
  });

  return placesMap;
};
