//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Setup imports
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
const fetch = require("node-fetch");
const query_string = require("query-string");
const temporaryKeys = require("../../oauth/setup/temporary-keys");
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Spotify keys
const spotifyAccessToken = temporaryKeys.spotify.spotifyAccessToken;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/functions/getCurrentlyPlayingSong
router.get("/getCurrentlyPlayingSong", async (req, res) => {
  if (spotifyAccessToken.value !== "") {
    temporaryKeys.spotify.refreshAccessToken();
  }

  const response = await fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + spotifyAccessToken.value,
    },
  });

  if (response.status === 200) {
    const responseInJson = await response.json();

    //console.log("\x1b[36m%s\x1b[0m", responseInJson.item);

    const songInfo = responseInJson.item;

    if (responseInJson.currently_playing_type === "ad") {
      res.status(204);
      res.end();
    } else {
      res.status(200).send(songInfo);
      res.end();
    }
  } else if (response.status === 204) {
    res.status(204);
    res.end();
  } else if (response.status === 401) {
    res.status(401);
    res.end();
  }
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/functions/getCurrentListener
router.get("/getCurrentListener", async (req, res) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + spotifyAccessToken.value,
    },
  });

  const {
    display_name,
    country,
    images,
    external_urls,
  } = await response.json();

  if (response.status === 200) {
    res.status(200).send({ display_name, country, images, external_urls });
    res.end();
  } else if (response.status === 204) {
    res.status(204);
    res.end();
  } else if (response.status === 401) {
    res.status(401);
    res.end();
  }
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/functions/saveSongAndListenerToDatabase
router.post("/saveSongAndListenerToDatabase", async (req, res) => {
  const requestBody = await req.body;

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Database
  //Saving song and listener info to database
  const uri =
    "mongodb+srv://bonito:.Kuba135.@cluster0.t72hm.mongodb.net/current-song?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect(async (err) => {
    const songDatabase = client.db("current-song");
    await songDatabase.collection("allSongs").insertOne(requestBody);

    client.close();
  });
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  res.status(200).send(requestBody);
  res.end();
});
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// spotify/functions/getInfoOfPreviousSongsAndListeners
router.get("/getInfoOfPreviousSongsAndListeners", async (req, res) => {
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //Database
  //Getting song and listener info from database

  const uri =
    "mongodb+srv://bonito:.Kuba135.@cluster0.t72hm.mongodb.net/current-song?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const limitOfFetchedSongs = parseInt(req.query.limit);

  if (req.query.limit) {
    try {
      client.connect(async (err) => {
        const songDatabase = client.db("current-song");
        const songCollection = await songDatabase
          .collection("allSongs")
          .find({})
          .limit(limitOfFetchedSongs)
          .toArray();

        if (err) {
          console.error(err);
          res.status(204);
          res.end();
        } else {
          res.status(200).send(songCollection);
          res.end();
        }

        client.close();
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      client.connect(async (err) => {
        const songDatabase = client.db("current-song");
        const songCollection = await songDatabase
          .collection("allSongs")
          .find({})
          .toArray();

        if (err) {
          console.error(err);
          res.status(204);
          res.end();
        } else {
          res.status(200).send(songCollection);
          res.end();
        }

        client.close();
      });
    } catch (err) {
      console.error(err);
    }
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Exporting routes
module.exports = router;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
