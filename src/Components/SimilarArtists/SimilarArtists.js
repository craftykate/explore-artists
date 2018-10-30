import React from 'react';

const SimilarArtists = (props) => {
  const artists = props.artists.map(artist => {
    let image = null;
    if (artist.thumbnail.length > 2) {
      image = <img src={artist.thumbnail[2].url} alt="artist thumbnail" className="thumbnail" />
    }

    return (
      <li key={artist.id}>
        <div className="thumbnail">{image}</div>
        <div className="liContent">
          <a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a> | {artist.genres.join(', ')}
        </div>
        <div className="clear"></div>
      </li>
    )
  })
  return (
    <div>
      <h2>Related to: {props.artistInfo.name}</h2>
      <p>{props.artistInfo.genres.join(', ')}</p>
      <ul>
        {artists}
      </ul>
    </div>
  )
};

export default SimilarArtists;
