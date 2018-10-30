import React from 'react';

const SearchResults = (props) => {
  let artists = "No Results";
  if (props.artists.length !== 0) {
    artists = props.artists.map(artist => {

      let image = null;
      if (artist.thumbnail.length > 0) {
        image = <img src={artist.thumbnail[2].url} alt="artist thumbnail" className="thumbnail" />
      }

      let genres = null;
      if (artist.genres.length > 0) {
        genres = `Genres: ${ artist.genres.join(', ') }`

      }

      return (
        <li key={artist.id} className="artist">
          <div className="thumbnail">{image}</div>
          <div className="liContent">
            {/* eslint-disable-next-line */}
            <a onClick={() => props.searchArtist(artist.id)} className="artist">
              {artist.name}
            </a>
            {genres}
          </div>
          <div className="clear"></div>
        </li>
      )
    })
  }

  let tracks = "No Results";
  if (props.tracks.length !== 0) {
    tracks = props.tracks.map(track => {
      let image = null;
      if (track.thumbnail.length > 0) {
        image = <img src={track.thumbnail[2].url} alt="album thumbnail" className="thumbnail" />
      }
      const artists = track.artists.map(artist => {
        return (
          /* eslint-disable-next-line */ 
          <a onClick={() => props.searchArtist(artist.id)} key={artist.id} className="trackArtists">{artist.name}</a>
        )
      })
      return (
        <li key={track.trackID}>
          <div className="thumbnail">{image}</div>
          <div className="liContent">
            {/* eslint-disable-next-line */}
            {track.trackName} {artists}
          </div>
          <div className="clear"></div>
        </li>
      )
    })
  }

  return (
    <div>
      <h2>Searching: {props.searchTerm}</h2>
      <p className="instructions">Choose an artist to get a list of similar artists</p>
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
