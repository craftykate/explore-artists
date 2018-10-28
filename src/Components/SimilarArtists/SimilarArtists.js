import React from 'react';

const SimilarArtists = (props) => {
  const artists = props.artists.map(artist => {
    return (
      <li key={artist.id}>
        {artist.name} | {artist.genres.join(', ')}
      </li>
    )
  })
  return (
    <div>
      <h2>{props.searchTerm}</h2>
      <ul>
        {artists}
      </ul>
    </div>
  )
};

export default SimilarArtists;
