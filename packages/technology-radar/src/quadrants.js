const {idealItemWidth} = require('./layout');

const angles = [90, 0, -90, -180];

const compareByOrder = (a, b) => a.order - b.order;

const createQuadrants = (rings, items) => {
  const quadrants = {};
  let quadrantsCreated = 0;

  items.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(quadrants, item.quadrant)) {
      quadrants[item.quadrant] = {
        order: quadrantsCreated,
        name: item.quadrant,
        startAngle: angles[quadrantsCreated],
        rings: {},
        itemCounter: 1
      };
      Object.entries(rings).forEach(([ringName, ring]) => {
        quadrants[item.quadrant].rings[ringName] = {...ring, items: []};
      });
      quadrantsCreated += 1;

      if (quadrantsCreated > 4) {
        throw new Error('More than four quadrants defined. Check your data.');
      }
    }
    quadrants[item.quadrant].rings[item.ring].items.push({
      ...item,
      width: idealItemWidth,
      number: quadrants[item.quadrant].itemCounter
    });
    quadrants[item.quadrant].itemCounter += 1;
  });

  return Object.entries(quadrants)
    .map(([, quadrant]) => ({
      order: quadrant.order,
      name: quadrant.name,
      startAngle: quadrant.startAngle,
      rings: Object.entries(quadrant.rings)
        .map(([, ring]) => ({
          ...ring,
          items: [...ring.items]
        }))
        .sort(compareByOrder)
    }))
    .sort(compareByOrder);
};

exports.createQuadrants = createQuadrants;
