const router = require("express").Router();
const fetch = require("node-fetch");
const query_string = require("query-string");
const keys = require("../../oauth/setup/keys");
const { URLSearchParams } = require('url');

const client_id = keys.spotify.clientID;
const client_secret = keys.spotify.clientSecret;
const redirect_uri = keys.spotify.redirectURI;
const scope = keys.spotify.scope;
const response_type = "code";

//auth/spotify/login
const spotify_login_string = query_string.stringifyUrl({
  url: "https://accounts.spotify.com/authorize",
  query: {
    client_id,
    response_type,
    redirect_uri,
    scope,
  },
});

router.get("/spotify/login", (req, res) => {
  res.redirect(spotify_login_string);
});

//auth/spotify/redirect
router.get("/spotify/redirect", (req, res) => {
  const code = req.query.code || null;
  console.log(code);

  const URLParams = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  }

  const bodyWithURLParams = query_string.stringify(URLParams)

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: bodyWithURLParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": "Basic " + (new Buffer(client_id + ":" + client_secret).toString("base64")),
    },
  }).then((json) => console.log(json));
});

//auth/spotify/logout
//router.get();

module.exports = router;
