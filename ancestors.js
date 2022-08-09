const fs = require('fs');
const xml2js = require('xml2js');

const { getPersons } = require('./ancestors/person');
const { getPlaces } = require('./ancestors/places');

const file = fs.readFileSync('gramps.xml');

xml2js.parseString(file, (err, result) => {
  const data = {
    persons: getPersons(result.database),
    updated: new Date().toLocaleString(),
  };
  const places = getPlaces(result.database);

  fs.writeFileSync('family.json', JSON.stringify(data));
  fs.writeFileSync('places.json', JSON.stringify(places));
});
