const { findEvent } = require('./events');

const getFamily = (ref, database) =>
  database.families[0].family.find((family) => family.$.handle === ref);

const getPerson = (ref, database) => database.people[0].person.find((p) => p.$.handle === ref);
const getSpouse = (ref, database) => {
  if (ref && ref[0]) return getPerson(ref[0].$.hlink, database);
  return null;
};

const getChildren = (family) => {
  if (family.childref) return family.childref.map((childref) => childref.$.hlink);
  return [];
};

const findFamily = (person, database) => {
  if (person.parentin) {
    const gender = person.gender[0];

    return person.parentin.map((familyRef) => {
      const family = getFamily(familyRef.$.hlink, database);
      const spouseRef = gender === 'M' ? family.mother : family.father;
      const spouse = getSpouse(spouseRef, database);
      const marriage = findEvent(family.eventref, database)?.find(
        (event) => event.type === 'Marriage'
      );

      return {
        type: family.rel[0].$.type,
        spouse: spouse ? spouse.$.handle : null,
        children: getChildren(family, database),
        marriage,
      };
    });
  }

  return [];
};

module.exports = findFamily;
