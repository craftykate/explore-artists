import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import SimilarArtists from '../SimilarArtists/SimilarArtists';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchArtist: '',
      searchPoint: '',
      searchItems: [[], []],
      artists: []
    }
  }

  componentDidMount() {
    const checkWindow = window.location.href.match(/access_token=([^&]*)/);
    if (checkWindow !== null) {
      this.searchItem(sessionStorage.getItem("searchItem"));
    }
  }

  searchItem = (searchTerm) => {
    sessionStorage.setItem("searchItem", searchTerm);
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
          searchItem={this.searchItem}/>
        {this.state.searchPoint === '' ?
          <p>Enter search term above</p>
        : null}
        {this.state.searchPoint === 'items' ? 
          <SearchResults 
            searchTerm={this.state.searchTerm}
            artists={this.state.searchItems[0]} 
            tracks={this.state.searchItems[1]} 
            searchArtist={this.searchForSimilarArtists} /> 
        : null}
        {this.state.searchPoint === 'artists' ?
          <SimilarArtists
            searchTerm={this.state.searchArtist}
            artists={this.state.artists} /> 
        : null}
        <Footer />
      </div>
    );
  }
}

export default App;
