module.exports = {
  spotify: {
    clientID: "543ccf3b8d0a42ada0c87d95b10bd39f",
    clientSecret: "7e9b6c69718f4b7293fe31e6f6ae08b4",
    redirectURI: "http://localhost:5000/spotify/auth/redirect",
    scope: "user-read-private user-read-email",

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //Spotify auth tokens info
    spotifyAccessToken: "",
    spotifyTokenType: "",
    spotifyExpiresIn: 0,
    spotifyRefreshToken: "",
  },
};
