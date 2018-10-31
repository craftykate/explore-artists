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

  return (
    <div>
      <h2>Related to: {props.artistInfo.name}</h2>
      <p className="instructions">{genres}Click on an artist to see their similar artists</p>
      <ul>
        {artists}
      </ul>
    </div>
  )
};

export default SimilarArtists;
