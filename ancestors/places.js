const { findSources } = require('./sources');

const sanitizeCoordinate = (coord) => parseFloat(coord.replace(',', '.'));
const getLat = (place) => (place.coord ? sanitizeCoordinate(place.coord[0].$.lat) : null);
const getLng = (place) => (place.coord ? sanitizeCoordinate(place.coord[0].$.long) : null);

module.exports.getPlaces = (database) => {
  const placesByHandle = new Map();

  const getText = (place) => {
    if (place.noteref) {
      return database.notes[0].note.find((note) => note.$.handle === place.noteref[0].$.hlink)
        .text[0];
    }
    return '';
  };

  const normalizeType = (place) => {
    const raw = (place?.$?.type || '').trim();
    if (!raw) return 'place';

    // Preserve legacy labels for any UI logic you already have.
    const legacy = {
      City: 'city',
      Village: 'village',
      Farm: 'farm',
      Building: 'building',
    };

    return legacy[raw] || raw.toLowerCase();
  };

  const toPlaceObj = (place) => ({
    id: place.$.id,
    type: normalizeType(place),
    grampsType: place.$.type, // original Gramps type, untouched
    handle: place.$.handle,
    name: place.pname[0].$.value,
    lat: getLat(place),
    lng: getLng(place),
    children: [],
    text: getText(place),
    sources: findSources(place, database),
  });

  const placeObjs = database?.places?.[0]?.placeobj || [];

  // 1) Create all nodes first (order-independent)
  placeObjs.forEach((place) => {
    placesByHandle.set(place.$.handle, toPlaceObj(place));
  });

  // 2) Link children to parents via placeref (type-independent)
  placeObjs.forEach((place) => {
    const child = placesByHandle.get(place.$.handle);
    const parentHandle = place?.placeref?.[0]?.$?.hlink;
    if (!parentHandle) return;

    const parent = placesByHandle.get(parentHandle);
    if (!parent) return; // orphaned reference; keep as root

    child.parent = parent.id;
    parent.children.push(child);
  });

  // 3) Roots are places with no resolvable parent
  return [...placesByHandle.values()].filter((p) => !p.parent);
};
