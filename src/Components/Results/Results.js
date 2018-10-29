import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import SimilarArtists from '../SimilarArtists/SimilarArtists';

const Results = (props) => {
  return (
    <div id="results">
      {
        props.searchPoint === '' ?
          <p>Enter search term above</p>
          : null
      }
          {
      props.searchPoint === 'items' ?
      <SearchResults
        searchTerm={props.searchTerm}
        artists={props.artists}
        tracks={props.tracks}
        searchArtist={props.searchArtist} />
      : null
    }
    {
      props.searchPoint === 'artists' ?
      <SimilarArtists
        searchTerm={props.searchTerm}
        artists={props.similarArtists} />
      : null
    }
    </div>
  )
};

export default Results;
