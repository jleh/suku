import React from 'react';
import styled from 'styled-components';
import get from 'lodash/get';

const printBirth = child => (child.events.birth ? `* ${child.events.birth}` : null);
const printDeath = child => (child.events.death ? `† ${child.events.death}` : null);

const findPerson = (handle, persons) => persons.find(p => p.handle === handle);

const Dates = styled.span`
  font-size: 0.75em;
`;

export default ({ families, persons }) => (
  <div className="family">
    {families.map(family => (
      <div key={family.spouse}>
        {get(findPerson(family.spouse, persons), 'name')}
        <ol>
          {family.children.map(c => findPerson(c, persons)).map((child, index) => (
            <li key={index}>
              {child.name}
              {' '}
              <Dates>{printBirth(child)} {printDeath(child)}</Dates>
            </li>
          ))}
        </ol>
      </div>
    ))}
  </div>
);
