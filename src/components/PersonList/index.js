import React from 'react';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

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

const mapStateToProps = state => ({
  personList: state.personList
});

export default connect(mapStateToProps)(PersonList);

export { PersonList as PersonListWithoutContext };
