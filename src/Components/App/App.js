import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    const checkWindow = window.location.href.match(/access_token=([^&]*)/);
    if (checkWindow !== null) {
      this.searchForSimilarArtists(sessionStorage.getItem("artistID"));
    }
  }

  searchForSimilarArtists = (artistID) => {
    sessionStorage.setItem("artistID", artistID);
    Spotify.getSimilarArtists(artistID).then(artists => {
      this.setState({
        artists: artists
      })
    })
  }
  
  render() {
    const artists = this.state.artists.map(artist => <li key={artist.id}>{artist.name}</li>);

    return (
      <div>
        <p onClick={() => this.searchForSimilarArtists('43ZHCT0cAZBISjO8DG9PnE')}>Search for Similar Artists</p>
        <ul>
          {artists}
        </ul>
      </div>
    );
  }
}

export default App;
