import React from 'react';

const HomeLink = ({backLinkText, setSelected}) => (
  <div
    dangerouslySetInnerHTML={{__html: `&#171; ${backLinkText}`}}
    className="home-link selected"
    onClick={() => setSelected('none')}
  />
);

export default HomeLink;
