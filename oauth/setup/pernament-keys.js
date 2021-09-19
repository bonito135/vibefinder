let currentURL;

if (process.env.CURRENT_URL) {
  currentURL = process.env.CURRENT_URL;
} else {
  currentURL = "http://localhost:5000";
}

module.exports = {
  spotify: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectURI: `${currentURL}/spotify/auth/redirect`,
    scope:
      "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state",
  },
};
