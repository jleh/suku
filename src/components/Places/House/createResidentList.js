import sortBy from 'lodash/sortBy';

const RESIDENCE_START_TYPES = ['Birth', 'Residence', 'Occupation'];
const RESIDENCE_END_TYPES = [...RESIDENCE_START_TYPES, 'Death'];

const getNextEvent = (currentEvent, events) => events
  .find(evt => RESIDENCE_END_TYPES.includes(evt.type) && evt.date > currentEvent.event.date);

const createResidentList = (placeEvents, personsById) => {
  const residences = [];

  sortBy(placeEvents, 'event.date').forEach((event) => {
    const personId = event.id;

    if (RESIDENCE_START_TYPES.includes(event.type)) {
      const person = personsById.get(personId);
      const { personEvents } = person.events;
      const nextEvent = getNextEvent(event, personEvents);

      residences.push({
        person,
        start: event.event.date,
        end: nextEvent && nextEvent.date
      });
    }
  });

  return residences;
};

export default createResidentList;
