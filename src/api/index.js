import fetch from 'unfetch';

import config from '../../config.json';
import { createIdMap, createRefMap, createPlacesMap } from '../util';
import treeBuilder from '../treeBuilder';

export const getWorldEvents = () =>
  fetch(`${config.backend}/worldEvents`).then((res) => res.json());

export const getPlaces = async () => {
  const data = await fetch(`${config.basePath}/places.json`).then((res) => res.json());

  return {
    places: data,
    placesById: createPlacesMap(data),
  };
};

export const getData = () =>
  fetch('/suku/family.json')
    .then((res) => res.json())
    .then((data) => ({
      data: treeBuilder(data.persons, config.rootPerson),
      personList: data.persons,
      personsById: createIdMap(data.persons),
      personsByRef: createRefMap(data.persons),
      updated: data.updated,
    }));
