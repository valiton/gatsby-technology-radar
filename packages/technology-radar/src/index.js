const {checkFields, cleanInput} = require('./checkInput');
const {createRings} = require('./rings');
const {createQuadrants} = require('./quadrants');
const {calculateCoordinates} = require('./itemCoordinates');

const checkItems = items => {
  const checkedAndCleandItems = [];

  items.forEach(item => {
    if (!checkFields(item)) {
      throw new Error(
        'Not all mandantory fields are present. Check your data.'
      );
    }
    checkedAndCleandItems.push(cleanInput(item));
  });

  return checkedAndCleandItems;
};

const createRadar = (name, items) => {
  const checkedItems = checkItems(items);

  const rings = createRings(checkedItems);
  const quadrants = createQuadrants(rings, checkedItems);

  quadrants.forEach(quadrant => {
    quadrant.rings.forEach(ring => {
      calculateCoordinates(quadrant, ring);
    });
  });

  return {
    name,
    quadrants
  };
};

exports.createRadar = createRadar;
