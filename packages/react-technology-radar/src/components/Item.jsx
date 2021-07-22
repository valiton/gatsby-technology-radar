import React, {useEffect, useRef} from 'react';
import Triangle from './Triangle';
import Circle from './Circle';
import ReactTooltip from 'react-tooltip';

const Item = ({
  x,
  y,
  number,
  isNew,
  width,
  order,
  name,
  scale,
  minItemWidth,
  itemTransform,
  highlighted
}) => {
  const ref = useRef(null);
  const realScale = 1 / scale;

  if (width * realScale < minItemWidth) {
    width = minItemWidth / realScale;
  }

  useEffect(() => {
    if (ref.current && number === highlighted) {
      ReactTooltip.show(ref.current);
    }
  }, [highlighted, number, ref.current]);

  const transform = `scale(${
    itemTransform.scale
  }) translate(${itemTransform.translate * x},${itemTransform.translate * y})`;

  let opacity = 1;
  if (highlighted !== 0 && highlighted !== number) {
    opacity = 0.3;
  }

  return (
    <g
      ref={ref}
      className="item-link"
      id={`item-link-${number}`}
      data-tip={name}
      transform={transform}
      style={{opacity}}
    >
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
