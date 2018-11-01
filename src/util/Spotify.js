import secret from './secret';

const clientID = secret.clientID;
const redirectLink = secret.redirectLink;

const spotifyLink = `https://api.spotify.com/v1`;
const scopes = `user-modify-playback-state%20playlist-modify-public`;

let accessToken = '';
let expires_in;

let Spotify = {

  // get tracks and artists matching user's search term
  searchItems(searchTerm) {
    const link = `${spotifyLink}/search?type=artist,track&q=${searchTerm}`;

    return this.fetchGET(link).then(jsonResponse => {
      if (jsonResponse) {
        // get marching artists
        const artists = jsonResponse.artists.items.map(artist => {
          return {
            id: artist.id,
            name: artist.name,
            thumbnail: artist.images,
            genres: artist.genres
          }
        });
        // get matching tracks
        const tracks = jsonResponse.tracks.items.map(track => {
          return {
            artists: track.artists,
            trackName: track.name,
            trackID: track.id,
            thumbnail: track.album.images
          }
        });
        // return both as array in one return statement
        return [artists, tracks]
      } else {
        return [[],[]]
      }
    })
  },

  // get info about artist being searched
  getArtistInfo(artistID) {
    const link = `${spotifyLink}/artists/${artistID}`;
    
    return this.fetchGET(link).then(jsonResponse => {
      if (jsonResponse) {
       return {
          name: jsonResponse.name,
          id: jsonResponse.id,
          genres: jsonResponse.genres,
          thumbnail: jsonResponse.images,
          url: jsonResponse.external_urls.spotify
        }
      } else {
        return [];
      }
    })
  },

  // get list of similar artists
  getSimilarArtists(artistID) {
    const link = `${spotifyLink}/artists/${artistID}/related-artists`;

    return this.fetchGET(link).then(jsonResponse => {
      if (jsonResponse) {
        return jsonResponse.artists.map(artist => {
          return {
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
            thumbnail: artist.images,
            url: artist.external_urls.spotify
          }
        })
      } else {
        return []
      }
    })
  },

  // get accesstoken from variable or url
  // if no accesstoken, refresh page
  getAccessToken() {
    // check if url contains access token
    const checkToken = window.location.href.match(/access_token=([^&]*)/);
    if (accessToken) {
      return accessToken;
    } else if (checkToken) {
      return this.getTokenInfo();
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectLink}&scope=${scopes}&response_type=token&state=state`
    }
  },

  // get token and epiration time
  getTokenInfo() {
    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    expires_in = window.location.href.match(/expires_in=([^&]*)/)[1];
    window.setTimeout(() => {
      accessToken = '';
    }, expires_in * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  },

  // reusable fetch get code, returns json response
  fetchGET(link) {
    const headers = this.getHeaders();
    return fetch(link, { headers: headers }).then(response => {
      if (response.ok) {
        return response.json();
      }
    });
  },

  // headers for fetch get
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json'
    };
  }
};

export default Spotify;