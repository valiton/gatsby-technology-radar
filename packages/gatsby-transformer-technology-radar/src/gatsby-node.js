const {createRadar} = require(`@valiton/technology-radar`);

const shouldOnCreateNode = ({node}, pluginOptions) => {
  return node.internal.type === pluginOptions.nodeType;
};

const onCreateNode = (
  {node, actions, createNodeId, createContentDigest},
  pluginOptions
) => {
  if (!shouldOnCreateNode({node}, pluginOptions)) {
    return;
  }

  let radar;

  if (pluginOptions.layout) {
    radar = createRadar(
      pluginOptions.radarName,
      node.items,
      pluginOptions.layout
    );
  } else {
    radar = createRadar(pluginOptions.radarName, node.items);
  }

  const {createNode, createParentChildLink} = actions;

  const radarNode = {
    ...radar,
    id: createNodeId(`${node.id} Radar`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(radar),
      type: `TechnologyRadar`
    }
  };

  createNode(radarNode);
  createParentChildLink({parent: node, child: radarNode});
};

exports.onCreateNode = onCreateNode;
exports.shouldOnCreateNode = shouldOnCreateNode;
