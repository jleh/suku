export function addPersons(personData) {
  return {
    type: 'ADD_PERSONS',
    personData
  };
}

export function addPlaces(personList) {
  return {
    type: 'ADD_PLACES',
    personList
  };
}
