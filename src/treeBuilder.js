const processedPersons = {};

const findParents = (person, persons) => {
  // If persons parents are e.g. cousins their ancestors will be duplicated to
  // family tree. We only want one branch of ancestors.
  const exsistingPerson = processedPersons[person.id];
  let parents = [];

  if (exsistingPerson) {
    parents = [{}, {}];
  } else {
    parents = [
      person.father ? findParents(persons.find(p => p.handle === person.father), persons) : {},
      person.mother ? findParents(persons.find(p => p.handle === person.mother), persons) : {}
    ];
  }

  const treePerson = Object.assign({}, person, { parents });
  processedPersons[treePerson.id] = treePerson;

  if (exsistingPerson) {
    treePerson.duplicate = true;
    exsistingPerson.duplicate = true;
  }

  return treePerson;
};

export default (persons, rootPersonId) => {
  const rootPerson = persons.find(p => rootPersonId === p.id);
  return findParents(rootPerson, persons);
};
