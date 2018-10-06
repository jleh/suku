import React from 'react';
import { Link } from 'react-router-dom';

import styles from './linkedPerson.css';

import { findPerson, printBirth, printDeath } from '../../util';

export default ({ personRef, persons }) => {
  const person = findPerson(personRef, persons);

  if (!person) {
    return null;
  }

  return (
    <div>
      <Link to={`/person/${person.id}`}>
        {person.name}
      </Link>
      { ' ' }
      <span className={styles.dates}>{printBirth(person)} {printDeath(person)}</span>
    </div>
  );
};
