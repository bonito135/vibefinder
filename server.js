//Imports
const express = require("express");
const cors = require("cors");

//Environment
const server = express();
const port = process.env.PORT || 5000;
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Routes
const spotifyAuthRoutes = require("./server-routes/auth-routes/spotify-auth-routes");

//Routing
server.use("/auth", spotifyAuthRoutes);

//Listening to port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
