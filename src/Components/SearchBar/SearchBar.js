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

  logIn = () => {
    this.props.logIn();
  }

  search = () => {
    this.props.searchItem(this.state.searchTerm);
  }

  render() {
    let searchFields = (
      <div id="searchBar">
        {/* eslint-disable-next-line */}
        <a onClick={this.logIn} className="searchButton">Log In to Spotify</a>
      </div>
    );
    if (this.props.loggedIn) {
      searchFields = (
        <div id="searchBar">
          <input onChange={this.handleTermChange} placeholder="Enter item to search" />
          {/* eslint-disable-next-line */ }
          <a onClick={this.search} className="searchButton">Search</a>
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
