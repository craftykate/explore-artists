import React from 'react';
import './Results.css';
import SearchResults from '../SearchResults/SearchResults';
import SimilarArtists from '../SimilarArtists/SimilarArtists';

const Results = (props) => {
  // show log in phrase if user not logged in
  let loginInstructions = null;
  if (!props.loggedIn) {
    loginInstructions = '(log in with a free Spotify account first)'
  }

  // app instructions
  const instructions = (
    <div className="welcome">
      <p className="headline">Look up an artist to get a list of similar artists to explore!</p> 
      <p>Enter a song or artist above {loginInstructions} and choose the artist you want to explore.</p>
      <p>You'll get a list of similar artists and their genres. Keep clicking on artists to find more like them, drop down a music player to hear their popular songs, or launch their music in Spotify.</p>
      <p className="subwelcome">Chrome desktop is best supported by Spotify - you can listen to full songs right in the app! Otherwise you'll get snippets of songs, which is also super cool.</p>
      <p className="subwelcome">I love music and I love exploring new artists. That can be hard sometimes if I don't know what I'm looking for, so I built this app to give suggestions when I need some musical inspiration. I hope you enjoy it as much as I do.</p>
    </div>
  )

  // results of initial search
  const searchResults = (
    <SearchResults
      searchTerm={props.searchTerm}
      artists={props.artists}
      tracks={props.tracks}
      searchArtist={props.searchArtist} />
  )

  // results of similar artists search
  const similarArtists = (
    <SimilarArtists
      artistInfo={props.artistInfo}
      artists={props.similarArtists}
      searchArtist={props.searchArtist} />
  )

  return (
    <div id="results">
      {/* show instructions if nothing has been searched yet */}
      {props.searchPoint === '' ? instructions : null}
      {/* or show song/track search results after user input */}
      {props.searchPoint === 'items' ? searchResults : null}
      {/* or show similar artists */}
      {props.searchPoint === 'artists' ? similarArtists : null}
    </div>
  )
};

export default Results;
