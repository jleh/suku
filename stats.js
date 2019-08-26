const fs = require('fs');

const data = JSON.parse(fs.readFileSync('family.json'));

const ignoreSources = [
  // Add names to ignore
  ' Private'
];

const noSources = data.persons
  .filter(p => p.sources.length === 0)
  .filter(p => !ignoreSources.includes(p.name))
  .map(p => p.name);

console.log(noSources);
console.log(`${noSources.length} persons without any source refs`);
