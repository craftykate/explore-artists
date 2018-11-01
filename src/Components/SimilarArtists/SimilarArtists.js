import React, { Component } from 'react';
import Listing from '../Listing/Listing';
import MainArtist from '../MainArtist/MainArtist';


class SimilarArtists extends Component {

  // scroll to the top of the page if a new artist is loaded, DON'T scroll to the top if the player was revealed or shown - this is why this component is a class
  componentDidUpdate(prevProps) {
    if (this.props.visibility === prevProps.visibility) {
      window.scrollTo(0, 0);
    }
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
          togglePlayer={this.props.togglePlayer} 
          visibility={this.props.visibility} />
          
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
