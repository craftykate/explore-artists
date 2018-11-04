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
    if (this.state.visibility === prevState.visibility && !this.props.genre) {
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
    // Change title on search results if looking up similar artists or genres
    let title = "Similar Artists:";
    if (this.props.genre) {
      title = `Artists in the genre "${this.props.genre}":`
    }

    // show link to go back to artist search if in genre search
    let resetLink = null;
    if (this.props.genre) {
      resetLink = <a onClick={() => this.props.searchArtist(this.props.artistInfo.id)} className="resetLink">Go back to artists similar to {this.props.artistInfo.name}</a>
    }

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
          visibility={this.state.visibility}
          searchByGenre={this.props.searchByGenre}
          genre={this.props.genre} />
          
        {/* list of similar artists */}
        <h3>{title}</h3>
        <p className="instructions">
          {resetLink}
          Click on an artist to explore their similar artists
        </p>
        <ul>
          {artists}
        </ul>
      </div>
    )
  }
};

export default SimilarArtists;
