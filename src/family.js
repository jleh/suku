import React from 'react';

export default ({ families }) => (
  <div className="family">
    {families.map(family => (
      <div>
        {family.spouse}
        <ol>
          {family.children.map(child => (
            <li>{child}</li>
          ))}
        </ol>
      </div>
    ))}
  </div>
);
