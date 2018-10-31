import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  // log in to spotify when login button is clicked
  logIn = () => {
    this.props.logIn();
  }

  // update search term as user types
  handleTermChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  // if 'Enter' key is pressed perform search
  checkIfEnter = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  // reset search state (so input field is empty) and do search
  search = () => {
    this.setState({
      searchTerm: ''
    })
    this.props.searchItem(this.state.searchTerm);
  }

  render() {

    // if not logged in show Log in button
    let searchFields = (
      <div id="searchBar">
        {/* eslint-disable-next-line */}
        <a onClick={this.logIn} className="searchButton login">Log in to Spotify</a>
      </div>
    );

    // if logged in, show input field and search button
    if (this.props.loggedIn) {
      searchFields = (
        <div id="searchBar">
          <input 
            onChange={this.handleTermChange}
            onKeyPress={this.checkIfEnter}
            placeholder="Artist/song" 
            value={this.state.searchTerm}
            autoFocus />

          {/* eslint-disable-next-line */ }
          <a onClick={this.search} className="searchButton">Search</a>

          {/* eslint-disable-next-line */}
          <a onClick={this.props.clear}>(clear)</a>
        </div>
      )
    }
    
    return (
      <div>
        {searchFields}
      </div>
    )
  }
}

export default SearchBar;
