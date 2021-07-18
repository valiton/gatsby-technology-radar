import React from 'react';

const Button = ({order, text, setSelected, setHovered, selected, fullView}) => (
  <div
    className={`button ${order} ${selected ? 'selected' : ''} ${
      fullView || selected ? 'full-view' : ''
    }`}
    onMouseOver={() => setHovered(order)}
    onMouseOut={() => setHovered('none')}
    onClick={() => setSelected(order)}
  >
    {text}
  </div>
);

export default Button;
