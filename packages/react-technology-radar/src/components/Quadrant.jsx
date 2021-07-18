import React from 'react';
import Arc from './Arc';
import Line from './Line';
import Text from './Text';
import Item from './Item';
import Legend from './Legend';

const calcLinePoints = (size, startAngle) => {
  let startX = size * (1 - (-Math.sin(startAngle) + 1) / 2);
  let endX = size * (1 - (-Math.sin(startAngle - Math.PI / 2) + 1) / 2);

  let startY = size * (1 - (Math.cos(startAngle) + 1) / 2);
  let endY = size * (1 - (Math.cos(startAngle - Math.PI / 2) + 1) / 2);

  if (startY > endY) {
    const aux = endY;
    endY = startY;
    startY = aux;
  }

  return {startX, startY, endX, endY};
};

const Quadrant = ({
  quadrant,
  size,
  scale,
  opacity,
  setHovered,
  setSelected,
  selected
}) => {
  const {startX, startY, endX, endY} = calcLinePoints(
    size,
    quadrant.startAngle
  );

  let transform = '';
  let legend = null;
  if (selected) {
    const adjustX =
      Math.sin(quadrant.startAngle) - Math.cos(quadrant.startAngle);
    const adjustY =
      Math.cos(quadrant.startAngle) + Math.sin(quadrant.startAngle);

    const translateX = (-1 * (1 + adjustX) * size) / 2;
    const translateY = -1 * (1 - adjustY) * (size / 2 - 7);

    transform = `translate(${translateX},${translateY}) scale(2)`;

    legend = <Legend order={quadrant.order} size={size} scale={scale} />;
  }

  return (
    <>
      <g
        className={`quadrant-group quadrant-group-${quadrant.order}`}
        style={{opacity: opacity}}
        onMouseOver={() => setHovered(quadrant.order)}
        onMouseOut={() => setHovered('none')}
        onClick={() => setSelected(quadrant.order)}
        transform={transform}
      >
        {quadrant.rings.map(ring => (
          <Arc
            key={`quadrant-${quadrant.order}-ring-${ring.order}`}
            minRadius={ring.minRadius}
            maxRadius={ring.maxRadius}
            startAngle={quadrant.startAngle}
            order={ring.order}
            center={size / 2}
          />
        ))}

        <Line
          x1={size / 2}
          y1={startY - 2}
          x2={size / 2}
          y2={endY + 2}
          strokeWidth={10}
        />
        <Line
          x1={endX}
          y1={size / 2}
          x2={startX}
          y2={size / 2}
          strokeWidth={10}
        />
        {quadrant.rings.map(ring => (
          <React.Fragment key={`rind-${ring.order}`}>
            <Text
              key={`quadrant-${quadrant.order}-ring-${ring.order}-text`}
              x={
                quadrant.order === 'first' || quadrant.order === 'fourth'
                  ? size / 2 + (ring.minRadius + ring.maxRadius) / 2
                  : size / 2 - (ring.minRadius + ring.maxRadius) / 2
              }
              y={size / 2 + 4}
              text={ring.name}
            />
            {ring.items.map(item => (
              <Item
                key={`quadrant-item-${item.number}`}
                x={item.coordinates[0]}
                y={item.coordinates[1]}
                number={item.number}
                isNew={item.isNew}
                width={item.width}
                scale={scale}
                order={quadrant.order}
                name={item.name}
              />
            ))}
          </React.Fragment>
        ))}
      </g>
      {legend}
    </>
  );
};

export default Quadrant;
