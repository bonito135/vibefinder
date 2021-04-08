import React, { useContext, useEffect, useState } from "react";
import "./CurrentSongField.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

//Functions
import getCurrentListener from "../../../Functions/getCurrentListener";
import getCurrentlyPlayingSong from "../../../Functions/getCurrentlyPlayingSong";
import saveSongAndListenerToDatabase from "../../../Functions/saveSongAndListenerToDatabase";

//Context
import LoginContext from "../../../Context/LoginContext";
import RefreshContext from "../../../Context/RefreshContext";
import AddSongFieldTypeContext from "../../../Context/AddSongFieldTypeContext";
import AudioPlayerSourceContext from "../../../Context/AudioPlayerSourceContext";

export default function AddSongField() {
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({});

  const { setIsLoggedIn } = useContext(LoginContext);
  const { refresh } = useContext(RefreshContext);
  const { setAddSongFieldType } = useContext(AddSongFieldTypeContext);
  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  const loadSongs = async () => {
    const response = await getCurrentlyPlayingSong();
    console.log(response);

    if (response.responseStatus === 401) {
      setIsLoggedIn(false);
    } else if (response.responseStatus === 204) {
      setSongIsPlaying(false);
    } else if (response.responseStatus === 200) {
      setSongInfo(response);
      setSongIsPlaying(true);
    }
  };

  const saveSong = async () => {
    const currentListener = await getCurrentListener();
    console.log(currentListener);

    const sort_by_date = new Date().getTime();

    const saveSongresponse = await saveSongAndListenerToDatabase(
      songInfo.name,
      songInfo.artists,
      songInfo.album,
      songInfo.preview_url,
      currentListener.display_name,
      currentListener.country,
      currentListener.images,
      sort_by_date
    );
    console.log(saveSongresponse);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setAddSongFieldType("currentSongField");
      loadSongs();
      setAudioPlayerSource("currentSong");
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      loadSongs();
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <div className="currentSongField">
      {!songIsPlaying ? (
        <>
          <h3 className="noSongText">No song is playing</h3>
        </>
      ) : (
        <>
          <img
            src={songInfo.album.images[1].url}
            className="albumPic"
            alt="album pic"
          ></img>
          <h1 className="songName">{songInfo.name}</h1>
          <h4 className="albumName">{songInfo.album.name}</h4>
          <AudioPlayer />
          <button onClick={saveSong} className="addSongButton">
            Submit
          </button>
        </>
      )}
    </div>
  );
}
