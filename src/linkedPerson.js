import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { findPerson, printBirth, printDeath } from './util';

const Dates = styled.span`
  font-size: 0.75em;
`;

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
      <Dates>{printBirth(person)} {printDeath(person)}</Dates>
    </div>
  );
};
