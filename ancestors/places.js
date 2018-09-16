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
  handle: city.$.handle,
  name: city.pname[0].$.value,
  coordinates: toCoordinates(city),
  villages: []
});

const toVillage = village => ({
  id: village.$.id,
  handle: village.$.handle,
  name: village.pname[0].$.value,
  coordinates: toCoordinates(village),
  farms: []
});

const toFarm = farm => ({
  id: farm.$.id,
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
      cities.get(village.placeref[0].$.hlink).villages.push(villageObject);
      villages.set(villageObject.handle, villageObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Farm')
    .forEach((farm) => {
      const farmObject = toFarm(farm);
      villages.get(farm.placeref[0].$.hlink).farms.push(farmObject);
      farms.set(farmObject.handle, farmObject);
    });

  database.places[0].placeobj
    .filter(place => place.$.type === 'Building')
    .forEach((building) => {
      farms.get(building.placeref[0].$.hlink).buildings.push(toFarm(building));
    });

  return [...cities.values()];
};
