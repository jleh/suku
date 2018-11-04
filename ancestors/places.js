const sanitizeCoordinate = coord => parseFloat(coord.replace(',', '.'));
const getLat = place => (place.coord ? sanitizeCoordinate(place.coord[0].$.lat) : null);
const getLng = place => (place.coord ? sanitizeCoordinate(place.coord[0].$.long) : null);

const toPlaceObj = (place, type) => ({
  id: place.$.id,
  type,
  handle: place.$.handle,
  name: place.pname[0].$.value,
  lat: getLat(place),
  lng: getLng(place),
  children: []
});

module.exports.getPlaces = (database) => {
  const cities = new Map();
  const villages = new Map();
  const farms = new Map();
  database.places[0].placeobj
    .filter(place => place.$.type === 'City')
    .forEach((city) => { cities.set(city.$.handle, toPlaceObj(city, 'city')); });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Village')
    .forEach((village) => {
      const villageObject = toPlaceObj(village, 'city');
      const city = cities.get(village.placeref[0].$.hlink);

      villageObject.parent = city.id;
      city.children.push(villageObject);
      villages.set(villageObject.handle, villageObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Farm')
    .forEach((farm) => {
      const farmObject = toPlaceObj(farm, 'farm');
      const village = villages.get(farm.placeref[0].$.hlink);

      farmObject.parent = village.id;
      village.children.push(farmObject);
      farms.set(farmObject.handle, farmObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Building')
    .forEach((building) => {
      const buildingObj = toPlaceObj(building, 'building');
      const farm = farms.get(building.placeref[0].$.hlink);

      buildingObj.type = 'building';
      buildingObj.parent = farm.id;
      farm.children.push(buildingObj);
    });

  return [...cities.values()];
};
