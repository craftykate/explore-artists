import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', // what the user initially searched for
      artistInfo: {}, // the name and genres of the artist the user wants to find similar artists to
      searchPoint: '', // 'items' if the user is looking at the initial search results and 'artists' if they are looking at similar artist results
      searchItems: [[],[]], // array[0] are artists matching the search term, array[1] are tracks matching the search term
      artists: [], // array of similar artists
      loggedIn: false // toggles input field
    }
  }

  componentDidMount() {
    const checkWindow = window.location.href.match(/access_token=([^&]*)/);
    if (checkWindow !== null) {
      this.setState({
        loggedIn: true
      })
    }
  }

  logIn = () => {
    this.setState({
      loggedIn: Spotify.getAccessToken()
    })
  }

  searchItem = (searchTerm) => {
    Spotify.searchItems(searchTerm).then(items => {
      this.setState({
        searchTerm: searchTerm,
        searchPoint: 'items',
        searchItems: items
      })
    })
  }

  searchForSimilarArtists = (artistID) => {
    Spotify.getArtistInfo(artistID).then(info => {
      Spotify.getSimilarArtists(artistID).then(artists => {
        this.setState({
          artistInfo: {name: info.name, genres: info.genres},
          searchPoint: 'artists',
          artists: artists
        })
      })
    })
  }

  clearResults = () => {
    this.setState({
      searchTerm: '',
      searchPoint: ''
    })
  }
  
  render() {
    return (
      <div id="content">
        <Header />
        <SearchBar 
          loggedIn={this.state.loggedIn}
          logIn={this.logIn}
          searchItem={this.searchItem}
          clear={this.clearResults} />
        <Results 
          loggedIn={this.state.loggedIn}
          searchPoint={this.state.searchPoint}
          searchTerm={this.state.searchTerm} 
          artistInfo={this.state.artistInfo}
          artists={this.state.searchItems[0]}
          tracks={this.state.searchItems[1]}
          searchArtist={this.searchForSimilarArtists}
          similarArtists={this.state.artists}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
