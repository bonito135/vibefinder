//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const router = require("express").Router();
const fetch = require("node-fetch");
const query_string = require("query-string");
const pernamentKeys = require("../../oauth/setup/pernament-keys");
const temporaryKeys = require("../../oauth/setup/temporary-keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const client_id = pernamentKeys.spotify.clientID;
const client_secret = pernamentKeys.spotify.clientSecret;
const redirect_uri = pernamentKeys.spotify.redirectURI;
const scope = pernamentKeys.spotify.scope;
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
      //console.log(dataInJson);

      temporaryKeys.spotify.spotifyAccessToken.replaceValue(
        dataInJson.access_token
      );

      temporaryKeys.spotify.spotifyTokenType.replaceValue(
        dataInJson.token_type
      );

      temporaryKeys.spotify.spotifyExpiresIn.replaceValue(
        dataInJson.expires_in
      );

      temporaryKeys.spotify.spotifyRefreshToken.replaceValue(
        dataInJson.refresh_token
      );

      //temporaryKeys.spotify.spotifyScope.replaceValue(dataInJson.scope);
    });
  const currentURL = process.env.CURRENT_URL || "http://localhost:3000";

  res.redirect(currentURL);
  console.log("\x1b[36m%s\x1b[0m", "Spotify login redirect successful");
  res.end();
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
