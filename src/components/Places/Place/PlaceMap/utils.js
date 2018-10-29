const getSubPlaces = (place) => {
  if (place.type === 'city') {
    return [
      ...place.villages,
      ...place.villages.reduce((villages, village) => [...villages, ...getSubPlaces(village)], [])
    ];
  }

  if (place.type === 'village') {
    return [
      ...place.farms,
      ...place.farms.reduce((farms, farm) => [...farms, ...getSubPlaces(farm)], [])
    ];
  }

  if (place.type === 'farm') {
    return [
      ...place.buildings,
      ...place.buildings.map((buildings, building) => [...buildings, ...getSubPlaces(building)], [])
    ];
  }

  return [];
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
