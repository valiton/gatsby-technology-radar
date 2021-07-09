const {calculateCoordinates} = require('../src/itemCoordinates');
const {size, idealItemWidth, minItemWidth} = require('../src/layout');

test('It calculates coordinates for items in ring', () => {
  const items = [
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22},
    {width: 22}
  ];
  const quadrant = {name: 'quadrant', startAngle: 90};
  const ring = {name: 'ring', minRadius: 224, maxRadius: 256, items};

  calculateCoordinates(quadrant, ring);

  items.forEach(item => {
    expect(item.coordinates[0]).toBeGreaterThanOrEqual(0);
    expect(item.coordinates[0]).toBeLessThanOrEqual(size);
    expect(item.coordinates[1]).toBeGreaterThanOrEqual(0);
    expect(item.coordinates[1]).toBeLessThanOrEqual(size);
    expect(item.width).toBeLessThanOrEqual(idealItemWidth);
    expect(item.width).toBeGreaterThanOrEqual(minItemWidth);
  });
});

test('It places big items in center', () => {
  const items = [{width: 50}];
  const quadrant = {name: 'quadrant', startAngle: 0};
  const ring = {name: 'ring', minRadius: 0, maxRadius: 50, items};

  calculateCoordinates(quadrant, ring);

  expect(items[0].coordinates[0]).toEqual(items[0].coordinates[1]);
});
