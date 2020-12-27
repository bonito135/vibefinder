//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const router = require("express").Router();
const fetch = require("node-fetch");
const keys = require("../../oauth/setup/keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const spotifyAccessToken = keys.spotify.spotifyAccessToken;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// /functions/recentlyPlayed
router.get("/recentlyPlayed", (req, res) => {
  fetch("https://api.spotify.com/v1/me/player/recently-played", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + spotifyAccessToken,
    },
  }).then((response) => console.log(response));

  res.send("hello there");
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Exporting routes
module.exports = router;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
