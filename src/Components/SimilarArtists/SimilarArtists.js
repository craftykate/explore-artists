import React, { Component } from 'react';
import Listing from '../Listing/Listing';
import MainArtist from '../MainArtist/MainArtist';


class SimilarArtists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    }
  }

  // scroll to the top of the page if component first loads or if a new artist was searched - not if it was updated because the player was dropped down. 
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.visibility === prevState.visibility) {
      window.scrollTo(0, 0);
      // hide the player since new artist was searched
      if (this.state.visibility) {
        this.setState({
          visibility: false
        })
      }
    }
  }  
  
  // toggle visibility for media player
  togglePlayer = () => {
    let newState = !this.state.visibility
    this.setState({
      visibility: newState
    })
  }
  
  render() {
    // show listings of similar artists
    const artists = this.props.artists.map(artist => {
      return (
        <Listing
          key={artist.id}
          id={artist.id}
          type={"similarArtist"}
          thumbnail={artist.thumbnail}
          name={artist.name}
          genres={artist.genres}
          searchArtist={this.props.searchArtist} />
      )
    });

    return (
      <div>
        {/* show info on main artist */}
        <MainArtist
          artistInfo={this.props.artistInfo} 
          togglePlayer={this.togglePlayer} 
          visibility={this.state.visibility} />
          
        {/* list of similar artists */}
        <h3>Similar Artists:</h3>
        <p className="instructions">Click on an artist to explore their similar artists</p>
        <ul>
          {artists}
        </ul>
      </div>
    )
  }
};

export default SimilarArtists;
