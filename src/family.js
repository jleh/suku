import React from 'react';

const printBirth = child => (child.birth ? `* ${child.birth}` : null);
const printDeath = child => (child.death ? `† ${child.death}` : null);

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
              <span>{printBirth(child)} {printDeath(child)}</span>
            </li>
          ))}
        </ol>
      </div>
    ))}
  </div>
);
