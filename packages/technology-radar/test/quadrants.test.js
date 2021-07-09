const {createQuadrants} = require('../src/quadrants');

test('It creates quadrants with rings and items', () => {
  const items = [
    {name: 'item 1', ring: 'ring 1', quadrant: 'quadrant 1'},
    {name: 'item 2', ring: 'ring 2', quadrant: 'quadrant 1'},
    {name: 'item 3', ring: 'ring 1', quadrant: 'quadrant 2'},
    {name: 'item 4', ring: 'ring 2', quadrant: 'quadrant 2'}
  ];

  const rings = {
    'ring 2': {name: 'ring 2', order: 2},
    'ring 1': {name: 'ring 1', order: 1}
  };

  const quadrants = createQuadrants(rings, items);

  expect(quadrants).toHaveLength(2);
  expect(quadrants[0].order).toBe(0);
  expect(quadrants[1].order).toBe(1);
  expect(quadrants[0].rings).toHaveLength(2);
  expect(quadrants[0].rings[0].order).toBe(1);
  expect(quadrants[0].rings[1].order).toBe(2);
  expect(quadrants[0].rings[0].items).toHaveLength(1);
  expect(quadrants[0].rings[0].items[0].name).toBe('item 1');
  expect(quadrants[0].rings[0].items[0].number).toBe(1);
  expect(quadrants[0].rings[1].items).toHaveLength(1);
  expect(quadrants[0].rings[1].items[0].name).toBe('item 2');
  expect(quadrants[0].rings[1].items[0].number).toBe(2);
});

test('It does not create more than four quadrants', () => {
  const items = [
    {name: 'item 1', ring: 'ring 1', quadrant: 'quadrant 1'},
    {name: 'item 2', ring: 'ring 2', quadrant: 'quadrant 2'},
    {name: 'item 3', ring: 'ring 1', quadrant: 'quadrant 3'},
    {name: 'item 4', ring: 'ring 2', quadrant: 'quadrant 4'},
    {name: 'item 5', ring: 'ring 2', quadrant: 'quadrant 5'}
  ];

  const rings = {
    'ring 2': {name: 'ring 2', order: 2},
    'ring 1': {name: 'ring 1', order: 1}
  };

  expect(() => createQuadrants(rings, items)).toThrowError(
    'More than four quadrants defined. Check your data.'
  );
});
