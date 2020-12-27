//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const router = require("express").Router();
const fetch = require("node-fetch");
const query_string = require("query-string");
const keys = require("../../oauth/setup/keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const client_id = keys.spotify.clientID;
const client_secret = keys.spotify.clientSecret;
const redirect_uri = keys.spotify.redirectURI;
const scope = keys.spotify.scope;
const response_type = "code";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/auth/login
const spotify_auth_string = query_string.stringifyUrl({
  url: "https://accounts.spotify.com/authorize",
  query: {
    client_id,
    response_type,
    redirect_uri,
    scope,
  },
});

router.get("/login", (req, res) => {
  res.redirect(spotify_auth_string);
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/auth/redirect
router.get("/redirect", (req, res) => {
  const code = req.query.code || null;

  const URLParams = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  };

  const bodyWithURLParams = query_string.stringify(URLParams);

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: bodyWithURLParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
  })
    .then((response) => response.json())
    .then((dataInJson) => {
      console.log(dataInJson);

      keys.spotifyAccessToken = dataInJson.access_token;
      console.log(keys.spotifyAccessToken);

      keys.spotifyTokenType = dataInJson.token_type;
      console.log(keys.spotifyTokenType);

      keys.spotifyExpiresIn = dataInJson.expires_in;
      console.log(keys.spotifyExpiresIn);

      keys.spotifyRefreshToken = dataInJson.refresh_token;
      console.log(keys.spotifyRefreshToken);

      keys.spotifyScope = dataInJson.scope;
      console.log(keys.spotifyScope);
    });

  res.redirect("http://localhost:3000");
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/auth/logout
//router.get("/logout");

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Exporting routes
module.exports = router;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
