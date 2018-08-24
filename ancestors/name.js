const getPrefix = (surname) => {
  if (surname[0]._ && surname[0].$.prefix) {
    return `${surname[0].$.prefix} `;
  }
  return '';
};

const printName = (person) => {
  if (!person) {
    return '';
  }

  const name = person.name[0];
  const surname = name.surname[0]._ ? name.surname[0]._ : name.surname;

  return `${name.first || ''} ${getPrefix(name.surname)}${surname}`;
};

module.exports = printName;
