jest.doMock('@valiton/technology-radar', () => ({
  createRadar: (name, items) => ({name, items, layout: {}})
}));

const {onCreateNode} = require('../src/gatsby-node');

test('it creates a node for given type', () => {
  const node = {internal: {type: 'foo'}};
  const createNode = jest.fn();
  const createNodeId = jest.fn();
  const createContentDigest = jest.fn();
  const createParentChildLink = jest.fn();

  const actions = {createNode, createParentChildLink};

  onCreateNode(
    {node, actions, createNodeId, createContentDigest},
    {nodeType: 'foo', nodeName: 'test'}
  );

  expect(createNode.mock.calls.length).toBe(1);
});

test('it creates a node for given type with layout', () => {
  const node = {internal: {type: 'foo'}};
  const createNode = jest.fn();
  const createNodeId = jest.fn();
  const createContentDigest = jest.fn();
  const createParentChildLink = jest.fn();

  const actions = {createNode, createParentChildLink};

  onCreateNode(
    {node, actions, createNodeId, createContentDigest},
    {nodeType: 'foo', nodeName: 'test', layout: {size: 560}}
  );

  expect(createNode.mock.calls.length).toBe(1);
});

test('it does not create a node if the type does not match', () => {
  const node = {internal: {type: 'foo'}};
  const createNode = jest.fn();
  const actions = {createNode};

  onCreateNode({node, actions}, {nodeType: 'bar', nodeName: 'test'});

  expect(createNode.mock.calls.length).toBe(0);
});
