import React from 'react';

export default ({ person }) => person.wikipedia && (
  <div>
    <a href={person.wikipedia} target="_blank" rel="noopener noreferrer">
      Wikipedia
    </a>
  </div>
);
