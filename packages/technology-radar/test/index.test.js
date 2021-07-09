const {createRadar} = require('../src/index');

test('It takes name and items', () => {
  const radar = createRadar('radar-name', [
    {
      name: 'some-name',
      ring: 'ring',
      quadrant: 'quadrant',
      isNew: 'FALSE',
      description: 'description'
    }
  ]);

  expect(radar.name).toBe('radar-name');
  expect(radar.quadrants).toHaveLength(1);
  expect(radar.quadrants[0].name).toBe('quadrant');
});

test('It throws an error if fields are missing', () => {
  expect(() =>
    createRadar('radar-name', [
      {
        name: 'some-name',
        quadrant: 'quadrant',
        isNew: 'FALSE',
        description: 'description'
      }
    ])
  ).toThrowError('Not all mandantory fields are present. Check your data.');
});
