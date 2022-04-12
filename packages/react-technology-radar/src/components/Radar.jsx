import React, {useState} from 'react';
import styled from 'styled-components';
import Quadrant from './Quadrant';
import '../styles/base.scss';
import HomeLink from './HomeLink';
import ReactTooltip from 'react-tooltip';
import Button from './Button';
import QuadrantTable from './QuadrantTable';

const RadarContents = styled.svg``;

const calcAspectRatio = selected => {
  if (selected === 'none') {
    return 'xMidYMid';
  }

  if (selected === 'first' || selected === 'fourth') {
    return 'xMinYMid';
  }

  return 'xMaxYMid';
};

const Radar = ({radar: {quadrants, layout}, size, backLinkText}) => {
  const [hovered, setHovered] = useState('none');
  const [selected, setSelected] = useState('none');
  const [highlighted, setHighlighted] = useState(0);

  const quadrantHovered = quadrant => {
    setHovered(quadrant);
  };
  const quadrantSelected = quadrant => {
    setSelected(quadrant);
  };

  let homeLink = null;
  if (selected !== 'none') {
    homeLink = (
      <HomeLink backLinkText={backLinkText} setSelected={setSelected} />
    );
  }

  const scale = size / layout.size;
  const selectedQuadrantStartAngle = quadrants.reduce((angle, quadrant) => {
    if (quadrant.order === selected) {
      return quadrant.startAngle;
    }
    return angle;
  }, 0);
  return (
    <>
      <div className="radar-header">
        <div className="buttons-group">
          {quadrants.map(quadrant => (
            <Button
              key={`button-${quadrant.order}`}
              order={quadrant.order}
              text={quadrant.name}
              setHovered={quadrantHovered}
              setSelected={quadrantSelected}
              selected={quadrant.order === selected}
              fullView={selected === 'none'}
            />
          ))}
        </div>
        {homeLink}
      </div>
      <div id="radar">
        <RadarContents
          id="radar-plot"
          viewBox={`0 0 ${layout.size} ${layout.size}`}
          preserveAspectRatio={calcAspectRatio(selected)}
        >
          <g>
            {quadrants.map(quadrant => (
              <Quadrant
                key={quadrant.order}
                quadrant={quadrant}
                size={layout.size}
                scale={scale}
                opacity={
                  quadrant.order === hovered || hovered === 'none' ? 1 : 0.3
                }
                setHovered={quadrantHovered}
                setSelected={quadrantSelected}
                selected={selected}
                selectedQuadrantStartAngle={selectedQuadrantStartAngle}
                highlighted={highlighted}
              />
            ))}
          </g>
        </RadarContents>
        {quadrants.map(quadrant => (
          <QuadrantTable
            key={quadrant.order}
            quadrant={quadrant}
            selected={selected === quadrant.order}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
          />
        ))}
      </div>
      <ReactTooltip key={selected} />
    </>
  );
};

export default Radar;
