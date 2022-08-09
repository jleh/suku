import React from 'react';

const Geni = ({ person }) => {
  if (!person.geni) {
    return null;
  }

  return (
    <div>
      <a href={person.geni} target="_blank" rel="noopener noreferrer">
        Geni
      </a>
    </div>
  );
};

export default Geni;
