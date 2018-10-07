import React from 'react';

export default ({ person }) => {
  if (!person.wikipedia) {
    return null;
  }

  return (
    <div>
      <a href={person.wikipedia} target="_blank" rel="noopener noreferrer">
        Wikipedia
      </a>
    </div>
  );
};
