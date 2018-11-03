import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';
import ReactGA from 'react-ga';

// initialize google analytics
ReactGA.initialize('UA-1632848-20');
ReactGA.pageview('app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '', // what the user initially searched for
      artistInfo: {}, // the details of the artist the user wants to find similar artists to
      searchPoint: '', // 'items' if the user is looking at the initial search results and 'artists' if they are looking at similar artist results
      searchItems: [[],[]], // array[0] are artists matching the search term, array[1] are tracks matching the search term
      artists: [], // array of similar artists
      loggedIn: Spotify.checkIfLoggedIn(), // toggles input field
      playerVisibility: false // toggles media player visibility
    }
  }

  // check if access code still good - if not get new code
  componentWillUpdate() {
    const loggedIn = Spotify.checkIfLoggedIn();

    if (loggedIn !== this.state.loggedIn) {
      this.setState({
        loggedIn: Spotify.checkIfLoggedIn()
      })
    }
  }

  // log in to spotify, set loggedIn state to something other than false
  logIn = () => {
    this.setState({
      loggedIn: Spotify.getAccessToken()
    })
  }

  // initial search for artists and songs that match query
  searchItem = (searchTerm) => {
    Spotify.searchItems(searchTerm).then(items => {
      this.setState({
        searchTerm: searchTerm,
        searchPoint: 'items',
        searchItems: items
      })
    })
  }

  // search for similar artists
  searchForSimilarArtists = (artistID) => {
    Spotify.getArtistInfo(artistID).then(info => {
      Spotify.getSimilarArtists(artistID).then(artists => {
        this.setState({
          artistInfo: {...info},
          searchPoint: 'artists',
          artists: artists
        })
      })
    })
  }

  // reset search terms
  clearResults = () => {
    this.setState({
      searchTerm: '',
      searchPoint: ''
    })
  }

  // toggle visibility for media player
  togglePlayer = () => {
    let newState = !this.state.playerVisibility
    this.setState({
      playerVisibility: newState
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
          togglePlayer={this.togglePlayer}
          visibility={this.state.playerVisibility}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
