import React from 'react';
import Triangle from './Triangle';
import Circle from './Circle';

const Item = ({x, y, number, isNew, width, order}) => {
  return (
    <g className="item-link" id={`item-link-${number}`}>
      {isNew ? (
        <Triangle x={x} y={y} width={width} order={order} />
      ) : (
        <Circle x={x} y={y} width={width} order={order} />
      )}
      <text
        x={x}
        y={y + 4}
        className="item-text"
        textAnchor="middle"
        style={{fontSize: `${(width * 10) / 22}px`}}
      >
        {number}
      </text>
    </g>
  );
};

export default Item;
