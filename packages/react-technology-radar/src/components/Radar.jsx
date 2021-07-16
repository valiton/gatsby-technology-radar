import React, {useState} from 'react';
import styled from 'styled-components';
import Quadrant from './Quadrant';
import '../styles/base.scss';
import HomeLink from './HomeLink';
import ReactTooltip from 'react-tooltip';
import Button from './Button';

const RadarContents = styled.svg``;

const Radar = ({radar: {quadrants, layout}, size, backLinkText}) => {
  const [hovered, setHovered] = useState('none');
  const [selected, setSelected] = useState('none');

  console.log(size);

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
      <div id="radar" style={{height: `${size + 14}px`}}>
        <RadarContents id="radar-plot" width={size} height={`${size + 14}`} viewBox={`0 0 ${layout.size} ${layout.size}`}>
          <g>
            {quadrants
              .filter(
                quadrant =>
                  selected === 'none' || selected === quadrant.order
              )
              .map(quadrant => (
                <Quadrant
                  key={quadrant.order}
                  quadrant={quadrant}
                  center={layout.size / 2}
                  size={size}
                  opacity={
                    quadrant.order === hovered || hovered === 'none'
                      ? 1
                      : 0.3
                  }
                  setHovered={quadrantHovered}
                  setSelected={quadrantSelected}
                />
              ))}
          </g>
        </RadarContents>
      </div>
      <ReactTooltip />
    </>
  );
};

export default Radar;
