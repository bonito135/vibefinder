import React, { useEffect, useState } from "react";
import getCurrentListener from "./Functions/GetCurrentListener";
import getCurrentlyPlayingSong from "./Functions/GetCurrentlyPlayingSong";
import saveSongAndListenerToDatabase from "./Functions/SaveSongAndListenerToDatabase";
import getInfoOfPreviousSongsAndListeners from "./Functions/getInfoOfPreviousSongsAndListeners";
import logo from "./Spotify-Logo.svg";
import "./App.css";

function App() {
  const currentEnvironment = process.env.NODE_ENV;
  //console.log(`Environment: ${process.env.NODE_ENV}`);

  const [
    previousSongsAndListenersInfo,
    setPreviousSongsAndListenersInfo,
  ] = useState([]);
  const [currentListenerInfo, setCurrentListenerInfo] = useState({});
  const [currentSongInfo, setCurrentSongInfo] = useState({
    name: "",
    artists: [""],
    album: "",
    preview_url: "",
  });

  useEffect(() => {
    async function update() {
      const resultOfGetInfoOfPreviousSongsAndListeners = await getInfoOfPreviousSongsAndListeners();

      if (resultOfGetInfoOfPreviousSongsAndListeners.responseStatus === 200) {
        setPreviousSongsAndListenersInfo(
          resultOfGetInfoOfPreviousSongsAndListeners.responseInJSON
        );
      }
    }
    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentlyPlayingSongAndListener = async () => {
    const ListenerInfo = await getCurrentListener();
    const SongInfo = await getCurrentlyPlayingSong();

    if (ListenerInfo.responseStatus === 200) {
      setCurrentListenerInfo(ListenerInfo);
    }

    if (SongInfo.responseStatus === 200) {
      setCurrentSongInfo(SongInfo);
    }

    if (
      ListenerInfo.responseStatus === 200 &&
      SongInfo.responseStatus === 200
    ) {
      const { display_name, country, images } = ListenerInfo;
      const { name, artists, album, preview_url } = SongInfo;

      const resultOfSaveSongAndListenerToDatabase = await saveSongAndListenerToDatabase(
        name,
        artists,
        album,
        preview_url,
        display_name,
        country,
        images
      );

      if (resultOfSaveSongAndListenerToDatabase.responseStatus === 200) {
        console.log(resultOfSaveSongAndListenerToDatabase.responseInJSON);

        setPreviousSongsAndListenersInfo([
          ...previousSongsAndListenersInfo,
          resultOfSaveSongAndListenerToDatabase.responseInJSON,
        ]);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {currentEnvironment === "development" ? (
          <a href="http://localhost:5000/spotify/auth/login">login</a>
        ) : (
          <a href="/spotify/auth/login">login</a>
        )}

        <div>
          <button onClick={getCurrentlyPlayingSongAndListener}>
            Currently playing
          </button>
          {currentSongInfo.name === "" || undefined ? (
            <p>moment pls</p>
          ) : (
            <div>
              <h4>
                Currently playing artist: {currentSongInfo.artists[0].name}
              </h4>
              <p>{currentSongInfo.name}</p>
              <p>{currentSongInfo.preview_url}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
