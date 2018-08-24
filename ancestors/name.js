const printName = (person) => {
  if (!person) {
    return '';
  }

  const name = person.name[0];
  const surname = name.surname[0]._ ? name.surname[0]._ : name.surname;

  return `${name.first} ${surname}`;
};

module.exports = printName;
