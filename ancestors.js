const fs = require('fs');
const xml2js = require('xml2js');

const config = require('./config.json');

const { findEvents } = require('./ancestors/events');
const findSources = require('./ancestors/sources');
const findFamily = require('./ancestors/family');
const printName = require('./ancestors/name');

const file = fs.readFileSync('gramps.xml');

const processedPersons = [];

const findParents = (person, data) => {
  if (person.childof) {
    return data.families[0].family.find(f => f.$.handle === person.childof[0].$.hlink);
  }
  return null;
};

const findPerson = (hlink, database) => database.people[0].person.find(p => p.$.handle === hlink);

const coatOfArms = (person) => {
  if (person.attribute) {
    const attribute = person.attribute.find(a => a.$.type === 'arms');

    if (attribute) {
      return attribute.$.value;
    }
  }
  return undefined;
};

const printPerson = (person, database) => {
  // If persons parents are e.g. cousins their ancestors will be duplicated to
  // family tree. We only want one branch of ancestors.
  const exsistingPerson = processedPersons.find(p => person.$.id === p.id);
  let personParents = [{}, {}];

  if (!exsistingPerson) {
    const parents = findParents(person, database);
    const father = parents && parents.father
      ? printPerson(findPerson(parents.father[0].$.hlink, database), database)
      : {};
    const mother = parents && parents.mother
      ? printPerson(findPerson(parents.mother[0].$.hlink, database), database)
      : {};

    personParents = [father, mother];
  }

  const personNode = {
    id: person.$.id,
    name: printName(person),
    events: findEvents(person.eventref, database),
    parents: personParents,
    sources: findSources(person, database),
    duplicate: (exsistingPerson !== undefined),
    family: findFamily(person, database),
    coatOfArms: coatOfArms(person)
  };

  if (!exsistingPerson) {
    processedPersons.push(personNode);
  } else {
    exsistingPerson.duplicate = true;
  }

  return personNode;
};

xml2js.parseString(file, (err, result) => {
  const rootPerson = result.database.people[0].person.find(p => p.$.id === config.rootPerson);
  const tree = printPerson(rootPerson, result.database);

  fs.writeFileSync('family.json', JSON.stringify(tree));
});
