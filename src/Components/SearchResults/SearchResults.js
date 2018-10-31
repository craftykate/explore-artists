import React from 'react';
import Listing from '../Listing/Listing';

const SearchResults = (props) => {

  // show listings of artist search results if there are any
  let artists = "No Results";
  if (props.artists.length !== 0) {
    artists = props.artists.map(artist => {
      return (
        <Listing 
          key={artist.id}
          id={artist.id}
          type={"artist"}
          thumbnail={artist.thumbnail}
          name={artist.name}
          genres={artist.genres} 
          searchArtist={props.searchArtist} />
      )
    })
  }

  // show listings of track results if there are any
  let tracks = "No Results";
  if (props.tracks.length !== 0) {
    tracks = props.tracks.map(track => {
      return (
        <Listing 
          key={track.trackID}
          id={track.trackID}
          type={"track"}
          thumbnail={track.thumbnail}
          trackName={track.trackName}
          artists={track.artists}
          searchArtist={props.searchArtist} />
      )
    })
  }

  return (
    <div>
      <h2>Searching: {props.searchTerm}</h2>
      <p className="info"><span className="instructions">Choose an artist to get a list of similar artists</span></p>
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
