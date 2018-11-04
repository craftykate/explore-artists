import React from 'react';

const Player = (props) => (
  <iframe src={props.popularSongs} height="410" frameBorder="0" allowtransparency="true" allow="encrypted-media" title={props.artistID} className={props.visibility.toString()}></iframe>
);

export default Player;
