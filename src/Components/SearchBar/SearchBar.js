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

  search = () => {
    this.props.searchItem(this.state.searchTerm);
  }

  render() {
    return (
      <div id="searchBar">
        <input onChange={this.handleTermChange} placeholder="Enter item to search" />
        {/* eslint-disable-next-line */ }
        <a onClick={this.search} className="searchButton">Search</a>
      </div>
    )
  }
}

export default SearchBar;
