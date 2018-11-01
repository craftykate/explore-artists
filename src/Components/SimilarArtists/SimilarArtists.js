import React from 'react';
import Listing from '../Listing/Listing';
import Player from '../Player/Player';

const SimilarArtists = (props) => {
  // show image for main artist if there is one
  let image = null;
  if (props.artistInfo.thumbnail.length > 2) {
    image = <img src={props.artistInfo.thumbnail[2].url} alt="thumbnail" className="thumbnail" />
  }

  // set up genres for main artist, if there are any
  let genres = null;
  if (props.artistInfo.genres.length > 0) {
    genres = `Genres: ${props.artistInfo.genres.join(', ')}`
  }

  // toggle link for showing/hiding player
  let playerLink;
  if (props.visibility) {
    playerLink = "Hide player"
  } else {
    playerLink = "Show popular songs"
  }
  
  // link for popular songs player
  const popularSongs = `https://open.spotify.com/embed/artist/${props.artistInfo.id}`;

  // show listings of similar artists
  const artists = props.artists.map(artist => {
    return (
      <Listing
        key={artist.id}
        id={artist.id}
        type={"similarArtist"}
        thumbnail={artist.thumbnail}
        name={artist.name}
        genres={artist.genres}
        searchArtist={props.searchArtist} />
    )
  })

  return (
    <div>
      {/* scroll to top of page when loading similar artists */}
      {window.scrollTo(0,0)}

      {/* info on main artist */}
      <div className="mainArtist">
        <div className="title">{image}<h2>{props.artistInfo.name}</h2></div>
        <p className="info">
          {genres}
          {/* eslint-disable-next-line */}
          <a onClick={props.togglePlayer} className="playerLink">{playerLink}</a>
          <Player
            artistID={props.artistInfo.id}
            popularSongs={popularSongs}
            visibility={props.visibility} />
        </p>
      </div>

      {/* list of similar artists */}
      <h3>Similar Artists:</h3>
      <p className="instructions">Click on an artist to explore their similar artists</p>
      <ul>
        {artists}
      </ul>
    </div>
  )
};

export default SimilarArtists;
