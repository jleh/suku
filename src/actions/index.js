export function addPersonsAction(personData) {
  return {
    type: 'ADD_PERSONS',
    personData
  };
}

export function addPlacesAction(placesData) {
  return {
    type: 'ADD_PLACES',
    placesData
  };
}

export function addWorldEventsAction(worldEvents) {
  return {
    type: 'ADD_WORLD_EVENTS',
    worldEvents
  };
}
