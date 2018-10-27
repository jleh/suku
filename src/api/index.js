import fetch from 'unfetch';

import config from '../../config.json';
import { createIdMap, createRefMap, createPlacesMap } from '../util';
import treeBuilder from '../treeBuilder';

export const getWorldEvents = () => fetch('/suku/world.json').then(res => res.json());

export const getData = () => fetch('/suku/family.json')
  .then(res => res.json())
  .then(data => ({
    data: treeBuilder(data.persons, config.rootPerson),
    personList: data.persons,
    personsById: createIdMap(data.persons),
    personsByRef: createRefMap(data.persons),
    places: data.places,
    placesById: createPlacesMap(data.places),
    updated: data.updated
  }));
