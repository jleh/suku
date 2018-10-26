import React from 'react';
import sortBy from 'lodash/sortBy';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import withContext from '../../context';

const filterOutPrivateNames = persons => persons.filter(p => p.name !== ' Private');
const getLastName = (person) => {
  const splitName = person.name.split(' ');
  return splitName[splitName.length - 1];
};
const sortAndFilterList = persons => sortBy(filterOutPrivateNames(persons), getLastName);

const PersonList = ({ personList }) => (
  <div>
    <h2><Translate id="menu.personIndex" /></h2>
    {sortAndFilterList(personList).map(person => (
      <div key={person.id}>
        <Link to={`/person/${person.id}`}>{person.name}</Link>
      </div>
    ))}
  </div>
);

export default withContext(PersonList);
export { PersonList as PersonListWithoutContext };
