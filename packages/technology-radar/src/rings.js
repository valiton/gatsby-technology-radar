const {ringWidth} = require('./layout');

const ringWidths = [
  0,
  6 * ringWidth,
  11 * ringWidth,
  14 * ringWidth,
  16 * ringWidth
];

const createRings = items => {
  const rings = {};
  let order = 0;

  items.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(rings, item.ring)) {
      rings[item.ring] = {
        name: item.ring,
        order,
        minRadius: ringWidths[order],
        maxRadius: ringWidths[order + 1]
      };
      order += 1;
    }
    if (order > 4) {
      throw new Error('More than four rings defined. Check your data.');
    }
  });

  return rings;
};

exports.createRings = createRings;
