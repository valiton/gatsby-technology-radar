import React from 'react';
import styled from 'styled-components';
import Quadrant from './Quadrant';
import '../styles/base.scss';

const RadarContents = styled.svg``;

const Radar = ({radar, center, size}) => (
  <div id="radar" style={{height: `${size + 14}px`}}>
    <RadarContents id="radar-plot" width={size} height={`${size + 14}`}>
      <g>
        {radar.quadrants.map(quadrant => (
          <Quadrant
            key={quadrant.order}
            quadrant={quadrant}
            center={center}
            size={size}
          />
        ))}
      </g>
    </RadarContents>
  </div>
);

export default Radar;
