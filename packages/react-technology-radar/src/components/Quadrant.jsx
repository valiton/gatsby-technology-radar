import React from 'react';
import Arc from './Arc';
import Line from './Line';
import Text from './Text';
import Item from './Item';

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
  center,
  size,
  opacity,
  setHovered,
  setSelected
}) => {
  const {startX, startY, endX, endY} = calcLinePoints(
    size,
    quadrant.startAngle
  );

  return (
    <g
      className={`quadrant-group quadrant-group-${quadrant.order}`}
      style={{opacity: opacity}}
      onMouseOver={() => setHovered(quadrant.order)}
      onMouseOut={() => setHovered('none')}
      onClick={() => setSelected(quadrant.order)}
    >
      {quadrant.rings.map(ring => (
        <Arc
          key={`quadrant-${quadrant.order}-ring-${ring.order}`}
          minRadius={ring.minRadius}
          maxRadius={ring.maxRadius}
          startAngle={quadrant.startAngle}
          order={ring.order}
          center={center}
        />
      ))}

      <Line
        x1={center}
        y1={startY - 2}
        x2={center}
        y2={endY + 2}
        strokeWidth={10}
      />
      <Line x1={endX} y1={center} x2={startX} y2={center} strokeWidth={10} />
      {quadrant.rings.map(ring => (
        <>
          <Text
            key={`quadrant-${quadrant.order}-ring-${ring.order}-text`}
            x={
              quadrant.order === 'first' || quadrant.order === 'fourth'
                ? center + (ring.minRadius + ring.maxRadius) / 2
                : center - (ring.minRadius + ring.maxRadius) / 2
            }
            y={center + 4}
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
              order={quadrant.order}
              name={item.name}
            />
          ))}
        </>
      ))}
    </g>
  );
};

export default Quadrant;
