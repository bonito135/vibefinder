const currentURL = process.env.CURRENT_URL || "http://localhost:5000";

module.exports = {
  spotify: {
    clientID: "543ccf3b8d0a42ada0c87d95b10bd39f",
    clientSecret: "7e9b6c69718f4b7293fe31e6f6ae08b4",
    redirectURI: `${currentURL}/spotify/auth/redirect`,
    scope:
      "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state",
  },
};
