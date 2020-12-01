const router = require("express").Router();
const passport = require("passport");

//auth/spotifyLogin
router.get(
  "/spotify/login",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
  })
);

//auth/spotify/redirect
router.get("http://localhost:3000/auth/spotify/redirect", (req, res) => {
  console.log("reached callback URI");
  res.send("reached callback URI");
});

//auth/spotifyLogout
router.get("/spotify/logout", (req, res) => {
  //handle with Passport
  res.send("Logging out");
});

module.exports = router;
