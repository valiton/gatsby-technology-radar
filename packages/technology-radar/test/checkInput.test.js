const {checkFields, cleanInput} = require('../src/checkInput');

test('It checks for all necessary fields', () => {
  const fieldsOk = checkFields({
    name: 'test',
    ring: 'ring',
    quadrant: 'quadrant',
    description: 'description',
    isNew: 'FALSE'
  });
  expect(fieldsOk).toBeTruthy();
});

test('It returns false if a field is missing', () => {
  const fieldsOk = checkFields({
    ring: 'ring',
    quadrant: 'quadrant',
    description: 'description',
    isNew: 'FALSE'
  });
  expect(fieldsOk).toBeFalsy();
});

test('It allows extra fields', () => {
  const fieldsOk = checkFields({
    name: 'test',
    ring: 'ring',
    quadrant: 'quadrant',
    description: 'description',
    isNew: 'FALSE',
    another: 'foo'
  });
  expect(fieldsOk).toBeTruthy();
});

test('It removes not allowed markup', () => {
  const cleaned = cleanInput({
    name: 'test<br>',
    ring: '<a href="#">ring</a>',
    quadrant: 'quadrant',
    description: '<b>description</b>',
    isNew: 'FALSE'
  });

  expect(cleaned).toEqual({
    name: 'test',
    ring: 'ring',
    quadrant: 'quadrant',
    description: '<b>description</b>',
    isNew: 'FALSE'
  });
});
