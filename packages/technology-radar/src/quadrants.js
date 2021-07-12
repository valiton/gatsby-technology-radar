const {idealItemWidth} = require('./layout');
const {toRadian} = require('./itemCoordinates');

const angles = [90, 0, -90, -180];
const orderNames = ['first', 'second', 'third', 'fourth'];

const compareByOrder = (a, b) => a.order - b.order;

const createQuadrants = (rings, items) => {
  const quadrants = {};
  let quadrantsCreated = 0;
  let itemsCounter = 1;

  items.forEach(item => {
    if (!Object.prototype.hasOwnProperty.call(quadrants, item.quadrant)) {
      quadrants[item.quadrant] = {
        order: quadrantsCreated,
        orderName: orderNames[quadrantsCreated],
        name: item.quadrant,
        startAngle: angles[quadrantsCreated],
        startAngleRadian: toRadian(angles[quadrantsCreated]),
        rings: {}
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
      number: itemsCounter
    });
    itemsCounter += 1;
  });

  return Object.entries(quadrants)
    .map(([, quadrant]) => ({
      order: quadrant.order,
      orderName: quadrant.orderName,
      name: quadrant.name,
      startAngle: quadrant.startAngle,
      startAngleRadian: quadrant.startAngleRadian,
      rings: Object.entries(quadrant.rings)
        .map(([, ring]) => ({
          ...ring,
          items: ring.items.map(item => ({
            ...item,
            isNew: item.isNew.toLowerCase() === 'true'
          }))
        }))
        .sort(compareByOrder)
    }))
    .sort(compareByOrder);
};

exports.createQuadrants = createQuadrants;
