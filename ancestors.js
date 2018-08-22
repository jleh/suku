const fs = require('fs');
const xml2js = require('xml2js');

const config = require('./config.json');

const findEvents = require('./ancestors/events');
const findSources = require('./ancestors/sources');

const file = fs.readFileSync('gramps.xml');

const findParents = (person, data) => {
  if (person.childof) {
    return data.families[0].family.find(f => f.$.handle === person.childof[0].$.hlink);
  }
  return null;
};

const findPerson = (hlink, database) => database.people[0].person.find(p => p.$.handle === hlink);

const printName = (person) => {
  const name = person.name[0];
  const surname = name.surname[0]._ ? name.surname[0]._ : name.surname;

  return `${name.first} ${surname}`;
};

const printPerson = (person, database) => {
  const parents = findParents(person, database);
  const father = parents && parents.father
    ? printPerson(findPerson(parents.father[0].$.hlink, database), database)
    : {};
  const mother = parents && parents.mother
    ? printPerson(findPerson(parents.mother[0].$.hlink, database), database)
    : {};

  const personNode = {
    name: printName(person),
    events: findEvents(person.eventref, database),
    parents: [
      father,
      mother
    ],
    sources: findSources(person, database),
  };

  return personNode;
};

xml2js.parseString(file, (err, result) => {
  const rootPerson = result.database.people[0].person.find(p => p.$.id === config.rootPerson);
  const tree = printPerson(rootPerson, result.database);

  fs.writeFileSync('family.json', JSON.stringify(tree));
});
