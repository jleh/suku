const fs = require('fs');

const data = JSON.parse(fs.readFileSync('family.json'));

const ignoreSources = [
  'Juuso Jalmari Lehtinen',
  'Jari Kalevi Lehtinen',
  'Outi Annukka Lehtinen',
  'Toivo Armas Viitanen',
  'Aune Lyylikki Viitanen',
  ' Private',
  'Kaino Orvokki Viitanen',
  'Tauno Kalevi Lehtinen',
  'Raija Elina Lehtinen',
  'Päivi Lehtinen',
  'Lydia Lehtinen'
];

const noSources = data.persons
  .filter(p => p.sources.length === 0)
  .filter(p => !ignoreSources.includes(p.name))
  .map(p => p.name);

console.log(noSources);
console.log(`${noSources.length} persons without any source refs`);
