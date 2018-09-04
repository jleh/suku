module.exports.findAttributeValue = (items, type, value) => {
  if (items) {
    const attribute = items.find(a => a.$.type === type);

    if (attribute) {
      return attribute.$[value];
    }
  }

  return undefined;
};
