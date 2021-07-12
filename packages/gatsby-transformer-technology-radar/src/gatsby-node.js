const {createRadar} = require('@valiton/technology-radar');

const onCreateNode = (
  {node, actions, createNodeId, createContentDigest},
  pluginOptions
) => {
  if (node.internal.type === pluginOptions.nodeType) {
    const radar = createRadar(pluginOptions.radarName, node.items);

    const {createNode} = actions;

    const radarNode = {
      ...radar,
      id: createNodeId(`${node.id} Radar`),
      children: [],
      internal: {
        contentDigest: createContentDigest(radar),
        type: 'TechnologyRadar'
      }
    };

    createNode(radarNode);
  }
};

exports.onCreateNode = onCreateNode;
