const {createRings} = require('../src/rings');

test('It creates rings from items', () => {
  const rings = createRings(
    [
      {ring: 'first'},
      {ring: 'second'},
      {ring: 'third'},
      {ring: 'fourth'},
      {ring: 'fourth'}
    ],
    {ringWidth: 16}
  );

  expect(Object.keys(rings)).toHaveLength(4);
  expect(Object.keys(rings)).toEqual(['first', 'second', 'third', 'fourth']);
  expect(rings.first).toEqual({
    name: 'first',
    order: 0,
    minRadius: 0,
    maxRadius: 96
  });
  expect(rings.second).toEqual({
    name: 'second',
    order: 1,
    minRadius: 96,
    maxRadius: 176
  });
  expect(rings.third).toEqual({
    name: 'third',
    order: 2,
    minRadius: 176,
    maxRadius: 224
  });
  expect(rings.fourth).toEqual({
    name: 'fourth',
    order: 3,
    minRadius: 224,
    maxRadius: 256
  });
});

test('It creates not more than four rings', () => {
  expect(() =>
    createRings(
      [
        {ring: 'first'},
        {ring: 'second'},
        {ring: 'third'},
        {ring: 'fourth'},
        {ring: 'fifth'}
      ],
      {ringWidth: 22}
    )
  ).toThrowError('More than four rings defined. Check your data.');
});
