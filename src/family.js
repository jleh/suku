import React from 'react';

export default ({ families }) => (
  <div className="family">
    {families.map(family => (
      <div key={family.spouse}>
        {family.spouse}
        <ol>
          {family.children.map(child => (
            <li key={child}>{child}</li>
          ))}
        </ol>
      </div>
    ))}
  </div>
);
