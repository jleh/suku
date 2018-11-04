const getSubPlaces = (place) => {
  if (!place.children) {
    return [];
  }

  return [
    ...place.children,
    ...place.children.reduce((subPlaces, subPlace) => [...subPlaces, ...getSubPlaces(subPlace)], [])
  ];
};

const markerColor = (place) => {
  switch (place.type) {
    case 'city':
      return 'rgb(47, 162, 39)';
    case 'village':
      return 'rgb(177, 50, 50)';
    default:
      return 'rgb(51, 136, 255)';
  }
};

export { getSubPlaces, markerColor };
