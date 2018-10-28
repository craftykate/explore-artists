import React from 'react';

const SimilarArtists = (props) => {
  const artists = props.artists.map(artist => {
    return (
      <li key={artist.id}>
        <a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a> | {artist.genres.join(', ')}
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
