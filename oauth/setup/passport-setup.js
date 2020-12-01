const passport = require("passport");
const keys = require("./keys");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.use(
  new SpotifyStrategy(
    {
      //Options for Spotify strategy
      clientID: keys.spotify.clientID,
      clientSecret: keys.spotify.clientSecret,
      callbackURL: "http://localhost:3000/auth/spotify/redirect",
    },
    () => {
      //Passport callback function
    }
  )
);
