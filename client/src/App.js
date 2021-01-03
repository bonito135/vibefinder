import React, { useState } from "react";
import logo from "./Spotify-Logo.svg";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState("");
  const [currentArtist, setCurrentArtist] = useState("");

  const getCurrentlyPlaying = async () => {
    const response = await fetch(
      "http://localhost:5000/spotify/functions/playing"
    );

    console.log(response);
    if (response.status === 401) {
      setCurrentSong("You are not logged in");
    } else if (response.status === 204) {
      setCurrentSong("Currently not playing any song");
    } else if (response.status === 200) {
      const responseInJson = await response.json();
      console.log(responseInJson);
      setCurrentSong(responseInJson.item.name);
      setCurrentArtist(responseInJson.item.artists[0].name);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="http://localhost:5000/spotify/auth/login">login</a>

        <div>
          <button onClick={getCurrentlyPlaying}>Currently playing</button>
          {currentSong === "" || undefined ? (
            <p>moment pls</p>
          ) : (
            <div>
              <h4>Currently playing artist: {currentArtist}</h4>
              <p>{currentSong}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
