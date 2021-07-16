const {createRadar} = require('@valiton/technology-radar');

const onCreateNode = (
  {node, actions, createNodeId, createContentDigest},
  pluginOptions
) => {
  if (node.internal.type === pluginOptions.nodeType) {
    let radar;

    if (pluginOptions.layout) {
      radar = createRadar(
        pluginOptions.radarName,
        node.items,
        pluginOptions.layout
      );
    } else {
      radar = createRadar(
        pluginOptions.radarName,
        node.items,
        pluginOptions.layout
      );
    }

    const {createNode, createParentChildLink} = actions;

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
    createParentChildLink({parent: node, child: radarNode});
  }
};

exports.onCreateNode = onCreateNode;
