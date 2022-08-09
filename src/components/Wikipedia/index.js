import React from 'react';

const Wikipedia = ({ person }) => {
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

export default Wikipedia;
