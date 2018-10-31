import React from 'react';
import Listing from '../Listing/Listing';

const SimilarArtists = (props) => {
  // set up genres for main artist, if there are any
  let genres = null;
  if (props.artistInfo.genres.length > 0) {
    genres = `Genres: ${props.artistInfo.genres.join(', ')}`
  }

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

  // only show image if there is one
  let image = null;
  if (props.artistInfo.thumbnail.length > 2) {
    image = <img src={props.artistInfo.thumbnail[2].url} alt="thumbnail" className="thumbnail" />
  }

  return (
    <div>
      {/* scroll to top of page when loading similar artists */}
      {window.scrollTo(0,0)}

      {/* info on main artist */}
      <div className="mainArtist">
        <div className="title">{image}<h2>{props.artistInfo.name}</h2></div>
        <p className="info">{genres}</p>
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
