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
      recentArtists: [], // recently listened to artists
      searchTerm: '', // what the user initially searched for
      genre: '', // genre searched for
      artistInfo: {}, // the details of the artist the user wants to find similar artists to
      searchPoint: '', // 'items' if the user is looking at the initial search results and 'artists' if they are looking at similar artist results
      searchItems: [[],[]], // array[0] are artists matching the search term, array[1] are tracks matching the search term
      artists: [], // array of similar artists
      searchedArtists: [[], []],
      loggedIn: Spotify.checkIfLoggedIn(), // toggles input field
    }
  }

  componentWillMount() {
    if (this.state.loggedIn) {
      Spotify.getRecentArtists().then(recentArtists => {
        this.setState({
          recentArtists: recentArtists
        })
      })
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
        searchItems: items,
        genre: ''
      })
    })
  }

  // search for similar artists
  searchForSimilarArtists = (artistID) => {
    Spotify.getArtistInfo(artistID).then(info => {
      Spotify.getSimilarArtists(artistID).then(artists => {
        // add artist to searched artist array
        let searchedIDs = [...this.state.searchedArtists[0]];
        let searchedArtists = [...this.state.searchedArtists[1]];
        if (!searchedIDs.includes(info.id)) {
          searchedIDs.push(info.id);
          searchedArtists.push({name: info.name, id: info.id})
        }
        // add all data to state
        this.setState({
          artistInfo: {...info},
          searchPoint: 'artists',
          artists: artists,
          searchedArtists: [[...searchedIDs], [...searchedArtists]],
          genre: '',
          searchItems: ''
        })
      })
    })
  }

  // search for artists in a genre
  searchByGenre = (genre) => {
    Spotify.searchByGenre(genre).then(artists => {
      this.setState({
        genre: genre,
        searchPoint: 'artists',
        artists: artists
      })
    })
  }

  // reset search terms
  clearResults = () => {
    this.setState({
      searchTerm: '',
      searchPoint: '',
      genre: ''
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
          genre={this.state.genre}
          artistInfo={this.state.artistInfo}
          artists={this.state.searchItems[0]}
          tracks={this.state.searchItems[1]}
          searchArtist={this.searchForSimilarArtists}
          searchByGenre={this.searchByGenre}
          similarArtists={this.state.artists}
          recentArtists={this.state.recentArtists}
          searchedArtists={this.state.searchedArtists[1]}
          />
        <Footer />
      </div>
    );
  }
}

export default App;
