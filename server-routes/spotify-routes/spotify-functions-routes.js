//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const router = require("express").Router();
const fetch = require("node-fetch");
const temporaryKeys = require("../../oauth/setup/temporary-keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const spotifyAccessToken = temporaryKeys.spotify.spotifyAccessToken;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/functions/recentlyPlayed
router.get("/playing", (req, res) => {
  if (spotifyAccessToken.value !== "") {
    temporaryKeys.spotify.refreshAccessToken();
  }

  let responseStatusNumber = 0;

  fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + spotifyAccessToken.value,
    },
  })
    .then((response) => {
      responseStatusNumber = response.status;
      console.log(responseStatusNumber);

      if (responseStatusNumber === 200) {
        return response.json();
      } else if (responseStatusNumber === 204 || 401) {
        return response;
      }
    })
    .then((dataInJson) => {
      console.log(dataInJson);
      if (responseStatusNumber === 401) {
        console.log("\x1b[41m%s\x1b[0m", dataInJson);
        res.status(401);
        res.end();
      } else if (responseStatusNumber === 204) {
        console.log("\x1b[41m%s\x1b[0m", dataInJson);
        res.status(204);
        res.end();
      } else if (responseStatusNumber === 200) {
        console.log("\x1b[36m%s\x1b[0m", dataInJson);
        res.status(200).send(dataInJson);
        res.end();
      }
    });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Exporting routes
module.exports = router;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
