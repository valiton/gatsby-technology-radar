const {createQuadrants} = require('../src/quadrants');

test('It creates quadrants with rings and items', () => {
  const items = [
    {name: 'item 1', ring: 'ring 1', quadrant: 'quadrant 1', isNew: 'TRUE'},
    {name: 'item 2', ring: 'ring 2', quadrant: 'quadrant 1', isNew: 'FALSE'},
    {name: 'item 3', ring: 'ring 1', quadrant: 'quadrant 2', isNew: ''},
    {name: 'item 4', ring: 'ring 2', quadrant: 'quadrant 2', isNew: ''}
  ];

  const rings = {
    'ring 2': {name: 'ring 2', order: 2},
    'ring 1': {name: 'ring 1', order: 1}
  };

  const quadrants = createQuadrants(rings, items, {idealItemWidth: 22});

  expect(quadrants).toHaveLength(2);
  expect(quadrants[0].order).toBe('first');
  expect(quadrants[1].order).toBe('second');
  expect(quadrants[0].rings).toHaveLength(2);
  expect(quadrants[0].rings[0].order).toBe(1);
  expect(quadrants[0].rings[1].order).toBe(2);
  expect(quadrants[0].rings[0].items).toHaveLength(1);
  expect(quadrants[0].rings[0].items[0].name).toBe('item 1');
  expect(quadrants[0].rings[0].items[0].number).toBe(1);
  expect(quadrants[0].rings[0].items[0].isNew).toBe(true);
  expect(quadrants[0].rings[1].items).toHaveLength(1);
  expect(quadrants[0].rings[1].items[0].name).toBe('item 2');
  expect(quadrants[0].rings[1].items[0].number).toBe(2);
  expect(quadrants[0].rings[1].items[0].isNew).toBe(false);
});

test('It does not create more than four quadrants', () => {
  const items = [
    {name: 'item 1', ring: 'ring 1', quadrant: 'quadrant 1', isNew: ''},
    {name: 'item 2', ring: 'ring 2', quadrant: 'quadrant 2', isNew: ''},
    {name: 'item 3', ring: 'ring 1', quadrant: 'quadrant 3', isNew: ''},
    {name: 'item 4', ring: 'ring 2', quadrant: 'quadrant 4', isNew: ''},
    {name: 'item 5', ring: 'ring 2', quadrant: 'quadrant 5', isNew: ''}
  ];

  const rings = {
    'ring 2': {name: 'ring 2', order: 2},
    'ring 1': {name: 'ring 1', order: 1}
  };

  expect(() =>
    createQuadrants(rings, items, {idealItemWidth: 22})
  ).toThrowError('More than four quadrants defined. Check your data.');
});
