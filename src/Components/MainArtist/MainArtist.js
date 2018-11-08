import React from 'react';
import Player from '../Player/Player';

const MainArtist = (props) => {
  // show image for main artist if there is one
  let image = null;
  if (props.artistInfo.thumbnail) {
    image = <img src={props.artistInfo.thumbnail[0].url} alt="thumbnail" className="thumbnail" />
  }

  // set up genres for main artist, if there are any
  let genres = null;
  let genreArray = [];
  if (props.artistInfo.genres.length > 0) {
    // turn each genre into a link
    props.artistInfo.genres.forEach(genre => {
      let classTitle = "genre"
      if (genre === props.genre) {
        classTitle = "genre active";
      }
      genreArray.push(
        /* eslint-disable-next-line */ 
        <a onClick={() => props.searchByGenre(genre)} className={classTitle} key={genre}>{genre}</a>
      )
    })
    genres = genreArray;
  }

  // toggle link for showing/hiding player
  let playerLink;
  if (props.visibility) {
    playerLink = "Hide player"
  } else {
    playerLink = "Show/play popular songs"
  }

  // link for popular songs player
  const popularSongs = `https://open.spotify.com/embed/artist/${props.artistInfo.id}`;

  return (
    <div className="mainArtist">

      <div className="title">
        {image}
        <h2>{props.artistInfo.name}</h2>
      </div>

      <p className="info">
        <a href={props.artistInfo.url} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
        <span className="genreInstructions">Click a genre to look up artists in that genre:</span>
        <span>{genres}</span>
        {/* eslint-disable-next-line */}
        <a onClick={props.togglePlayer} className="playerLink">{playerLink}</a>
        <Player
          artistID={props.artistInfo.id}
          popularSongs={popularSongs}
          visibility={props.visibility} />
      </p>

    </div>
  )
};

export default MainArtist;
