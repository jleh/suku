const printName = require('./name');

const getFamily = (ref, database) => database.families[0].family
  .find(family => family.$.handle === ref);

const getPerson = (ref, database) => database.people[0].person.find(p => p.$.handle === ref);
const getSpouse = (ref, database) => (ref && ref[0] ? getPerson(ref[0].$.hlink, database) : null);

const getChildren = (family, database) => (family.childref
  ? family.childref.map(childref => printName(getPerson(childref.$.hlink, database)))
  : []);

const findFamily = (person, database) => {
  if (person.parentin) {
    const gender = person.gender[0];

    return person.parentin.map((familyRef) => {
      const family = getFamily(familyRef.$.hlink, database);
      const spouseRef = (gender === 'M') ? family.mother : family.father;
      const spouse = getSpouse(spouseRef, database);

      return {
        type: family.rel[0].$.type,
        spouse: printName(spouse),
        children: getChildren(family, database)
      };
    });
  }

  return [];
};

module.exports = findFamily;
