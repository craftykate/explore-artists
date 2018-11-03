import React from 'react';

const Listing = (props) => {
  // only show image if there is one
  let image = null;
  if (props.thumbnail.length > 0) {
    if (props.type === 'artist' || props.type === 'similarArtist') {
      image = <img src={props.thumbnail[0].url} alt="thumbnail" className="thumbnail" onClick={() => props.searchArtist(props.id)} style={{cursor: 'pointer'}}/>
    } else {
      image = <img src={props.thumbnail[0].url} alt="thumbnail" className="thumbnail" />
    }
  }

  // only show genres if there are any
  let genres = null;
  if (props.genres && props.genres.length > 0) {
    genres = `Genres: ${props.genres.join(', ')}`
  }

  // show artist info if type "artist"
  let info;
  if (props.type === 'artist' || props.type === 'similarArtist') {
    info = (
      <React.Fragment>
        {/* eslint-disable-next-line */ }
        <a onClick = {() => props.searchArtist(props.id)} className = "artist" >
          {props.name}
        </a>
        {genres}
      </React.Fragment>
    )

  // show track info if type "track"
  } else if (props.type === 'track') {

    // turn array of artists into clickable list
    const artists = props.artists.map(artist => {
      return (
        /* eslint-disable-next-line */
        <a onClick={() => props.searchArtist(artist.id)} key={artist.id} className="trackArtists">{artist.name}</a>
      )
    })

    info = (
      <React.Fragment>
        {/* eslint-disable-next-line */}
        {props.trackName} {artists}
      </React.Fragment>
    )
  }


  return (
    <li className="listing">
      <div className="thumbnail">{image}</div>
      <div className="liContent">
        {info}
      </div>
      <div className="clear"></div>
    </li>
  )
};

export default Listing;
