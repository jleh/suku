const toCoordinates = (place) => {
  if (place.coord) {
    return {
      lat: place.coord[0].$.lat,
      lng: place.coord[0].$.long
    };
  }

  return null;
};

const toCity = city => ({
  id: city.$.id,
  type: 'city',
  handle: city.$.handle,
  name: city.pname[0].$.value,
  coordinates: toCoordinates(city),
  villages: []
});

const toVillage = village => ({
  id: village.$.id,
  type: 'village',
  handle: village.$.handle,
  name: village.pname[0].$.value,
  coordinates: toCoordinates(village),
  farms: []
});

const toFarm = farm => ({
  id: farm.$.id,
  type: 'farm',
  handle: farm.$.handle,
  name: farm.pname[0].$.value,
  coordinates: toCoordinates(farm),
  buildings: []
});

module.exports.getPlaces = (database) => {
  const cities = new Map();
  const villages = new Map();
  const farms = new Map();

  database.places[0].placeobj
    .filter(place => place.$.type === 'City')
    .forEach((city) => { cities.set(city.$.handle, toCity(city)); });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Village')
    .forEach((village) => {
      const villageObject = toVillage(village);
      const city = cities.get(village.placeref[0].$.hlink);

      villageObject.city = city.id;
      city.villages.push(villageObject);
      villages.set(villageObject.handle, villageObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Farm')
    .forEach((farm) => {
      const farmObject = toFarm(farm);
      const village = villages.get(farm.placeref[0].$.hlink);

      farmObject.village = village.id;
      village.farms.push(farmObject);
      farms.set(farmObject.handle, farmObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Building')
    .forEach((building) => {
      const buildingObj = toFarm(building);

      buildingObj.type = 'building';
      farms.get(building.placeref[0].$.hlink).buildings.push(buildingObj);
    });

  return [...cities.values()];
};
