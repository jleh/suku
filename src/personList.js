import React from 'react';
import sortBy from 'lodash/sortBy';
import { Link } from 'react-router-dom';

const filterOutPrivateNames = persons => persons.filter(p => p.name !== ' Private');
const getLastName = (person) => {
  const splitName = person.name.split(' ');
  return splitName[splitName.length - 1];
};
const sortAndFilterList = persons => sortBy(filterOutPrivateNames(persons), getLastName);

export default ({ persons }) => (
  <div>
    <h2>Henkilöhakemisto</h2>
    {sortAndFilterList(persons).map(person => (
      <div key={person.id}>
        <Link to={`/person/${person.id}`}>{person.name}</Link>
      </div>
    ))}
  </div>
);
