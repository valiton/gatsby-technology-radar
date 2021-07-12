import React from 'react';

const Text = ({x, y, text}) => (
  <text className="line-text" x={x} y={y} textAnchor="middle">
    {text}
  </text>
);

export default Text;
