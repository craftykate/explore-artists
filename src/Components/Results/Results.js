import React from 'react';
import './Results.css';
import SearchResults from '../SearchResults/SearchResults';
import SimilarArtists from '../SimilarArtists/SimilarArtists';

const Results = (props) => {
  let loginInstructions = null;
  if (!props.loggedIn) {
    loginInstructions = '(log in first)'
  }
  const instructions = (
    <div className="instructions">
      <p className="headline">Look up an artist and get a list of similar artists to explore!</p> 
      <p>Enter a song or artist above {loginInstructions} and choose the artist you want to explore.</p>
      <p>You'll get a list of similar artists that you can listen to on your own device. Keep clicking on artists to find more like them, or launch their music in Spotify.</p>
      <p className="background">I love music and I love exploring new artists. That can be hard sometimes if I don't know what I'm looking for, so I built this little app to give suggestions when I need some musical inspiration. I hope you enjoy it as much as I do.</p>
    </div>
  )
  const searchResults = (
    <SearchResults
      searchTerm={props.searchTerm}
      artists={props.artists}
      tracks={props.tracks}
      searchArtist={props.searchArtist} />
  )
  const similarArtists = (
    <SimilarArtists
      artistInfo={props.artistInfo}
      searchTerm={props.searchTerm}
      artists={props.similarArtists} />
  )

  return (
    <div id="results">
      {props.searchPoint === '' ? instructions : null}
      {props.searchPoint === 'items' ? searchResults : null}
      {props.searchPoint === 'artists' ? similarArtists : null}
    </div>
  )
};

export default Results;
