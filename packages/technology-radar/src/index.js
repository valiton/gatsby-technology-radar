const {checkFields, cleanInput} = require('./checkInput');
const {createRings} = require('./rings');
const {createQuadrants} = require('./quadrants');
const {calculateCoordinates} = require('./itemCoordinates');
const {
  ringWidth: defaultRingWidth,
  idealItemWidth: defaultIdealItemWidth,
  minItemWidth: defaultMinItemWidth,
  size: defaultSize
} = require('./defaultLayout');

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

const createRadar = (
  name,
  items,
  {
    ringWidth = defaultRingWidth,
    idealItemWidth = defaultIdealItemWidth,
    minItemWidth = defaultMinItemWidth,
    size = defaultSize
  } = {}
) => {
  const layout = {ringWidth, idealItemWidth, minItemWidth, size};
  const checkedItems = checkItems(items);
  const rings = createRings(checkedItems, layout);
  const quadrants = createQuadrants(rings, checkedItems, layout);

  quadrants.forEach(quadrant => {
    quadrant.rings.forEach(ring => {
      calculateCoordinates(quadrant, ring, layout);
    });
  });

  return {
    name,
    quadrants,
    layout
  };
};

exports.createRadar = createRadar;
