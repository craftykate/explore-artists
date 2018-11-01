import React, { Component } from 'react';
import Listing from '../Listing/Listing';
import Player from '../Player/Player';

class SimilarArtists extends Component {

  // scroll to the top of the page if a new artist is loaded, DON'T scroll to the top if the player was revealed or shown - this is why this component is a class
  componentDidUpdate(prevProps) {
    if (this.props.visibility === prevProps.visibility) {
      window.scrollTo(0, 0);
    }
  }
  
  render() {
    // show image for main artist if there is one
    let image = null;
    if (this.props.artistInfo.thumbnail.length > 2) {
      image = <img src={this.props.artistInfo.thumbnail[2].url} alt="thumbnail" className="thumbnail" />
    }
  
    // set up genres for main artist, if there are any
    let genres = null;
    if (this.props.artistInfo.genres.length > 0) {
      genres = `Genres: ${this.props.artistInfo.genres.join(', ')}`
    }
  
    // toggle link for showing/hiding player
    let playerLink;
    if (this.props.visibility) {
      playerLink = "Hide player"
    } else {
      playerLink = "Show popular songs"
    }
    
    // link for popular songs player
    const popularSongs = `https://open.spotify.com/embed/artist/${this.props.artistInfo.id}`;
  
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
    })
    return (
      <div>
        {/* info on main artist */}
        <div className="mainArtist">
          <div className="title">{image}<h2>{this.props.artistInfo.name}</h2></div>
          <p className="info">
            {genres}
            {/* eslint-disable-next-line */}
            <a onClick={this.props.togglePlayer} className="playerLink">{playerLink}</a>
            <Player
              artistID={this.props.artistInfo.id}
              popularSongs={popularSongs}
              visibility={this.props.visibility} />
          </p>
        </div>

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
