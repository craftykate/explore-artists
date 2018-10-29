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
      searchTerm: '',
      searchArtist: '',
      searchPoint: '',
      searchItems: [],
      artists: [],
      loggedIn: false
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
    // sessionStorage.setItem("searchItem", searchTerm);
    Spotify.searchItems(searchTerm).then(items => {
      this.setState({
        searchTerm: searchTerm,
        searchPoint: 'items',
        searchItems: items
      })
    })
  }

  searchForSimilarArtists = (artistID, artistName) => {
    Spotify.getSimilarArtists(artistID).then(artists => {
      this.setState({
        searchArtist: artistName,
        searchPoint: 'artists',
        artists: artists
      })
    })
  }
  
  render() {
    return (
      <div id="content">
        <Header />
        <SearchBar 
          loggedIn={this.state.loggedIn}
          logIn={this.logIn}
          searchItem={this.searchItem}/>
        <Results 
          searchPoint={this.state.searchPoint}
          searchTerm={this.state.searchTerm} 
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
