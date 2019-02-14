export function addPersons(personData) {
  return {
    type: 'ADD_PERSONS',
    personData
  };
}

export function addPlaces(placesData) {
  return {
    type: 'ADD_PLACES',
    placesData
  };
}

export function addWorldEvents(worldEvents) {
  return {
    type: 'ADD_WORLD_EVENTS',
    worldEvents
  };
}
