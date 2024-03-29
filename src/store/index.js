import { createStore, combineReducers } from 'redux';

const defaultPersonsState = {
  personList: [],
  personsById: new Map(),
  personsByRef: new Map(),
};

const defaultPlacesState = {
  placesById: new Map(),
};

function persons(state = defaultPersonsState, action) {
  switch (action.type) {
    case 'ADD_PERSONS':
      return action.personData;
    default:
      return state;
  }
}

function places(state = defaultPlacesState, action) {
  switch (action.type) {
    case 'ADD_PLACES':
      return action.placesData;
    default:
      return state;
  }
}

function worldEvents(state = { events: [] }, action) {
  switch (action.type) {
    case 'ADD_WORLD_EVENTS':
      return action.worldEvents;
    default:
      return state;
  }
}

const reducers = combineReducers({
  persons,
  places,
  worldEvents,
});

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
