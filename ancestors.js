const fs = require('fs');
const xml2js = require('xml2js');

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

const formatDate = (date) => {
  const parts = date.split('-');

  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  return date;
};

const getEventType = (events, type) => events.find(event => event.type[0] === type);
const getEventDate = event => (event ? formatDate(event.dateval[0].$.val) : '');

const findEvents = (eventref, database) => {
  if (!eventref) {
    return {};
  }

  const events = eventref
    .map(event => event.$.hlink)
    .map(ref => database.events[0].event.find(event => event.$.handle === ref));

  return {
    birth: getEventDate(getEventType(events, 'Birth')),
    death: getEventDate(getEventType(events, 'Death')),
  };
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
      mother,
    ],
  };

  return personNode;
};

xml2js.parseString(file, (err, result) => {
  const rootPerson = result.database.people[0].person.find(p => p.$.id === 'I0000');
  const tree = printPerson(rootPerson, result.database);

  fs.writeFileSync('family.json', JSON.stringify(tree));
});
