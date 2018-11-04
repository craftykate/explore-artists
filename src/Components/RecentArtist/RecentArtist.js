import React, { Component } from 'react';
import Spotify from '../../util/Spotify';

class RecentArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: []
    }
  }

  componentWillMount() {
    Spotify.getArtistInfo(this.props.artist).then(artistInfo => {
      this.setState({
        artist: artistInfo
      })
    })
  }

  searchArtist = () => {
    this.props.searchArtist(this.state.artist.id)
  }

  render() {
    let image = [];
    if (this.state.artist.thumbnail) {
      image = <img src={this.state.artist.thumbnail[0].url} alt="thumbnail" className="thumbnail" />
    }
    return (
      <div className="recentArtist" onClick={this.searchArtist} style={{cursor: 'pointer'}}>
        {image}
        <p>{this.state.artist.name}</p>
      </div>
    )
  }
} 

export default RecentArtist;
