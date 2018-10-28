import React from 'react';

const SearchResults = (props) => {
  const artists = props.artists.map(artist => {
    return (
      <li key={artist.id}>
        {/* eslint-disable-next-line */}
        <a onClick={() => props.searchArtist(artist.id, artist.name)}>
          {artist.name}
        </a>
      </li>
    )
  })
  const tracks = props.tracks.map(track => {
    return (
      <li key={track.trackID}>
        {/* eslint-disable-next-line */}
        {track.trackName} : <a onClick={() => props.searchArtist(track.artistID, track.artistName)}>
          {track.artistName}
        </a>
      </li>
    )
  })

  return (
    <div>
      <h2>{props.searchTerm}</h2>
      <h3>Artist Results:</h3>
      <ul>
        {artists}
      </ul>
      <h3>Track Results:</h3>
      <ul>
        {tracks}
      </ul>
    </div>
  )
}

export default SearchResults;
