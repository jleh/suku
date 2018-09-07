import React from 'react';
import styled from 'styled-components';

const printBirth = child => (child.birth ? `* ${child.birth}` : null);
const printDeath = child => (child.death ? `† ${child.death}` : null);

const Dates = styled.span`
  font-size: 0.75em;
`;

export default ({ families }) => (
  <div className="family">
    {families.map(family => (
      <div key={family.spouse}>
        {family.spouse}
        <ol>
          {family.children.map((child, index) => (
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
