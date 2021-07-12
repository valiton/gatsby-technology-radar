import React from 'react';
import {arc} from 'd3-shape';

const Arc = ({minRadius, maxRadius, startAngleRadian, order, center}) => {
  const arcFunction = () =>
    arc()
      .innerRadius(minRadius)
      .outerRadius(maxRadius)
      .startAngle(startAngleRadian)
      .endAngle(startAngleRadian - Math.PI / 2);
  return (
    <path
      className={`ring-arc-${order}`}
      d={arcFunction()()}
      transform={`translate(${center}, ${center})`}
    />
  );
};

export default Arc;
