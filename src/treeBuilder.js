import { createRefMap } from './util';

export default (persons, rootPersonId) => {
  const rootPerson = persons.find((p) => rootPersonId === p.id);
  const personMap = createRefMap(persons);
  let maxGeneration = 0;

  // eslint-disable-next-line no-shadow
  const findParents = (person, personMap, processedPersons, generation) => {
    // If persons parents are e.g. cousins their ancestors will be duplicated to
    // family tree. We only want one branch of ancestors.
    const exsistingPerson = processedPersons.get(person.id);
    let parents = [];

    if (exsistingPerson) {
      parents = [{}, {}];
    } else {
      parents = [
        person.father
          ? findParents(personMap.get(person.father), personMap, processedPersons, generation + 1)
          : {},
        person.mother
          ? findParents(personMap.get(person.mother), personMap, processedPersons, generation + 1)
          : {},
      ];
    }

    const treePerson = { ...person, parents };
    processedPersons.set(treePerson.id, treePerson);

    if (exsistingPerson) {
      treePerson.duplicate = true;
      exsistingPerson.duplicate = true;
    }

    if (generation + 1 > maxGeneration) {
      // eslint-disable-next-line no-plusplus
      maxGeneration++;
    }

    return treePerson;
  };

  const person = findParents(rootPerson, personMap, new Map(), 0);

  return { ...person, maxGeneration };
};
