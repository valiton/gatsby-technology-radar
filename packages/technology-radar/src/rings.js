const ringWidthFactors = [0, 6, 11, 14, 16];

const createRings = (items, layout) => {
  const rings = {};
  let order = 0;

  items.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(rings, item.ring)) {
      rings[item.ring] = {
        name: item.ring,
        order,
        minRadius: ringWidthFactors[order] * layout.ringWidth,
        maxRadius: ringWidthFactors[order + 1] * layout.ringWidth
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
