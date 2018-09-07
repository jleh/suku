const fs = require('fs');
const xml2js = require('xml2js');

const { getPersons } = require('./ancestors/person');

const file = fs.readFileSync('gramps.xml');

xml2js.parseString(file, (err, result) => {
  const data = {
    persons: getPersons(result.database),
    updated: new Date().toLocaleString()
  };

  fs.writeFileSync('family.json', JSON.stringify(data));
});
