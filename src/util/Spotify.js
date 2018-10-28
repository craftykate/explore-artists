import secret from './secret';

const clientID = secret.clientID;
const redirectLink = secret.redirectLink;

const spotifyLink = `https://api.spotify.com/v1`;
const scopes = `user-modify-playback-state%20playlist-modify-public`;

let accessToken = '';
let expires_in;

let Spotify = {

  searchItems(searchTerm) {
    const link = `${spotifyLink}/search?type=artist,track&q=${searchTerm}`;

    return this.fetchGET(link).then(jsonResponse => {
      // console.log(jsonResponse);
      const artists = jsonResponse.artists.items.map(artist => {
        return {
          id: artist.id,
          name: artist.name
        }
      });
      const tracks = jsonResponse.tracks.items.map(track => {
        return {
          artistID: track.artists[0].id,
          artistName: track.artists[0].name,
          trackName: track.name,
          trackID: track.id
        }
      });
      return [artists, tracks]
    })
  },

  getSimilarArtists(artistID) {
    const link = `${spotifyLink}/artists/${artistID}/related-artists`;

    return this.fetchGET(link).then(jsonResponse => {
      if (jsonResponse) {
        // console.log(jsonResponse)
        return jsonResponse.artists.map(artist => {
          return {
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
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
      this.getTokenInfo() // Make this a promise so access token doesn't return before it's done?
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectLink}&scope=${scopes}&response_type=token&state=state`
    }
  },

  // get token and epiration time
  getTokenInfo() {
    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    expires_in = window.location.href.match(/expires_in=([^&]*)/)[1];
    window.setTimeout(() => accessToken = '', expires_in * 1000);
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