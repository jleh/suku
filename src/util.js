import { distanceInWordsStrict } from 'date-fns';
import fiLocale from 'date-fns/locale/fi';

export const printBirth = child => (child.events.birth ? `* ${child.events.birth}` : null);
export const printDeath = child => (child.events.death ? `† ${child.events.death}` : null);

export const findPerson = (handle, persons) => persons.find(p => p.handle === handle);

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
