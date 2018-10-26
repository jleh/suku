import { createRefMap } from './util';

const processedPersons = new Map();

const findParents = (person, personMap) => {
  // If persons parents are e.g. cousins their ancestors will be duplicated to
  // family tree. We only want one branch of ancestors.
  const exsistingPerson = processedPersons.get(person.id);
  let parents = [];

  if (exsistingPerson) {
    parents = [{}, {}];
  } else {
    parents = [
      person.father ? findParents(personMap.get(person.father), personMap) : {},
      person.mother ? findParents(personMap.get(person.mother), personMap) : {}
    ];
  }

  const treePerson = Object.assign({}, person, { parents });
  processedPersons.set(treePerson.id, treePerson);

  if (exsistingPerson) {
    treePerson.duplicate = true;
    exsistingPerson.duplicate = true;
  }

  return treePerson;
};

export default (persons, rootPersonId) => {
  const rootPerson = persons.find(p => rootPersonId === p.id);
  const personMap = createRefMap(persons);

  return findParents(rootPerson, personMap);
};
