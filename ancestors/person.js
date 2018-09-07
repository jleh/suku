const { findEvents } = require('./events');
const { findAttributeValue } = require('./utils');
const findSources = require('./sources');
const findFamily = require('./family');
const printName = require('./name');

const findParents = (person, data) => {
  if (person.childof) {
    return data.families[0].family.find(f => f.$.handle === person.childof[0].$.hlink);
  }
  return null;
};

const coatOfArms = person => findAttributeValue(person.attribute, 'arms', 'value');
const getWikipedia = person => findAttributeValue(person.url, 'wikipedia', 'href');

const toPerson = (person, database) => {
  const parents = findParents(person, database);

  const father = parents && parents.father ? parents.father[0].$.hlink : null;
  const mother = parents && parents.mother ? parents.mother[0].$.hlink : null;

  return {
    id: person.$.id,
    handle: person.$.handle,
    name: printName(person),
    coatOfArms: coatOfArms(person),
    wikipedia: getWikipedia(person),
    sources: findSources(person, database),
    events: findEvents(person.eventref, database),
    father,
    mother,
    family: findFamily(person, database)
  };
};

const getPersons = database => database.people[0].person.map(person => toPerson(person, database));

module.exports.getPersons = getPersons;
