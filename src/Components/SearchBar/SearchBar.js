import React, { Component } from 'react';

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  handleTermChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  checkIfEnter = (e) => {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  logIn = () => {
    this.props.logIn();
  }

  search = () => {
    this.setState({
      searchTerm: ''
    })
    this.props.searchItem(this.state.searchTerm);
  }

  render() {
    let searchFields = (
      <div id="searchBar">
        {/* eslint-disable-next-line */}
        <a onClick={this.logIn} className="searchButton login">Log in to Spotify</a>
      </div>
    );
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
