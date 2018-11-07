const fs = require('fs');

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

const findObjectWithAttribute = (objref, type, database) => {
  if (objref) {
    const profileRef = objref.find(obj => obj.attribute && obj.attribute[0].$.type === type);

    if (profileRef) {
      const ref = profileRef.$.hlink;
      const media = database.objects[0].object.find(obj => obj.$.handle === ref);
      const path = database.header[0].mediapath[0];

      fs.createReadStream(`${path}/${media.file[0].$.src}`).pipe(fs.createWriteStream(`media/${media.file[0].$.description}.jpg`));

      return `${media.file[0].$.description}.jpg`;
    }
  }

  return null;
};

const toPerson = (person, database) => {
  const parents = findParents(person, database);

  const father = parents && parents.father ? parents.father[0].$.hlink : null;
  const mother = parents && parents.mother ? parents.mother[0].$.hlink : null;

  return {
    id: person.$.id,
    handle: person.$.handle,
    name: printName(person),
    coatOfArms: coatOfArms(person),
    picture: findObjectWithAttribute(person.objref, 'profile', database),
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
