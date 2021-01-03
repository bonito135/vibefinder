//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const fetch = require("node-fetch");
const query_string = require("query-string");
const pernamentKeys = require("./pernament-keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const client_id = pernamentKeys.spotify.clientID;
const client_secret = pernamentKeys.spotify.clientSecret;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Creating general temporary key class
class TemporaryKey {
  replaceValue(value) {
    this.value = value;
  }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Creating specific temporary key classes
const spotifyAccessToken = new TemporaryKey();
const spotifyRefreshToken = new TemporaryKey();
const spotifyTokenType = new TemporaryKey();
const spotifyExpiresIn = new TemporaryKey();
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Creating function to refresh access token fron refresh token
const refreshAccessToken = () => {
  const URLParams = {
    grant_type: "refresh_token",
    refresh_token: spotifyRefreshToken.value,
  };

  const stringifiedURLParams = query_string.stringify(URLParams);

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: stringifiedURLParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
  })
    .then((response) => response.json())
    .then((dataInJson) => {
      spotifyAccessToken.replaceValue(dataInJson.access_token);
    });
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Exporting keys
module.exports = {
  spotify: {
    spotifyAccessToken,
    spotifyRefreshToken,
    spotifyTokenType,
    spotifyExpiresIn,
    refreshAccessToken,
  },
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
