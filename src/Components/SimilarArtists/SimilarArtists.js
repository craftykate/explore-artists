import React from 'react';

const SimilarArtists = (props) => {
  // set up genres for main artist, if there are any
  let genres = null;
  if (props.artistInfo.genres.length > 0) {
    genres = `Genres: ${props.artistInfo.genres.join(', ')}`
  }

  // loop through array of artists
  const artists = props.artists.map(artist => {

    // set up image if there is one
    let image = null;
    if (artist.thumbnail.length > 2) {
      image = <img src={artist.thumbnail[2].url} alt="artist thumbnail" className="thumbnail" />
    }

    return (
      <li key={artist.id}>
        <div className="thumbnail">{image}</div>
        <div className="liContent">
          <a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a> | {artist.genres.join(', ')}
        </div>
        <div className="clear"></div>
      </li>
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
