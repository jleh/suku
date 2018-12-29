import { createStore } from 'redux';

const defaultState = {
  personList: []
};

function presons(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_PERSONS':
      return action.personData;
    default:
      return state;
  }
}

const store = createStore(presons);

export default store;
