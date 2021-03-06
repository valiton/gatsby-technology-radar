const Chance = require('chance');

const calculateCoordinates = (quadrant, ring, layout) => {
  const sumRing = ring.name.split('').reduce((p, c) => p + c.charCodeAt(0), 0);
  const sumQuadrant = quadrant.name
    .split('')
    .reduce((p, c) => p + c.charCodeAt(0), 0);

  const chance = new Chance(
    Math.PI * sumRing * ring.name.length * sumQuadrant * quadrant.name.length
  );

  const allItemCoordinatesInRing = [];

  ring.items.forEach(item => {
    const coordinates = findItemCoordinates(
      chance,
      item,
      ring.minRadius,
      ring.maxRadius,
      quadrant.startAngle,
      allItemCoordinatesInRing,
      layout
    );

    allItemCoordinatesInRing.push(coordinates);

    item.coordinates = coordinates;
  });
};

const toRadian = angleInDegrees => (Math.PI * angleInDegrees) / 180;

const findItemCoordinates = (
  chance,
  item,
  minRadius,
  maxRadius,
  startAngle,
  allItemCoordinatesInRing,
  layout
) => {
  const maxIterations = 200;
  let coordinates = calculateItemCoordinates(
    chance,
    item,
    minRadius,
    maxRadius,
    startAngle,
    layout
  );
  let iterationCounter = 0;
  let foundAPlace = false;

  while (iterationCounter < maxIterations) {
    if (thereIsCollision(item.width, coordinates, allItemCoordinatesInRing)) {
      coordinates = calculateItemCoordinates(
        chance,
        item,
        minRadius,
        maxRadius,
        startAngle,
        layout
      );
    } else {
      foundAPlace = true;
      break;
    }
    iterationCounter++;
  }

  if (!foundAPlace && item.width > layout.minItemWidth) {
    item.width -= 1;
    return findItemCoordinates(
      chance,
      item,
      minRadius,
      maxRadius,
      startAngle,
      allItemCoordinatesInRing,
      layout
    );
  } else {
    return coordinates;
  }
};

const calculateItemCoordinates = (
  chance,
  item,
  minRadius,
  maxRadius,
  startAngle,
  layout
) => {
  const adjustX = Math.sin(startAngle) - Math.cos(startAngle);
  const adjustY = -Math.cos(startAngle) - Math.sin(startAngle);

  const radius = chance.floating({
    min: minRadius + item.width / 2,
    max: maxRadius - item.width / 2
  });

  let angleDelta = (Math.asin(item.width / 2 / radius) * 180) / Math.PI;
  angleDelta = angleDelta > 45 ? 45 : angleDelta;
  const angle = toRadian(
    chance.integer({min: angleDelta, max: 90 - angleDelta})
  );

  const center = layout.size / 2;
  const x = center + radius * Math.cos(angle) * adjustX;
  const y = center + radius * Math.sin(angle) * adjustY;

  return [x, y];
};

const thereIsCollision = (width, coordinates, allCoordinates) =>
  allCoordinates.some(
    currentCoordinates =>
      Math.abs(currentCoordinates[0] - coordinates[0]) < width &&
      Math.abs(currentCoordinates[1] - coordinates[1]) < width
  );

exports.calculateCoordinates = calculateCoordinates;
exports.toRadian = toRadian;
