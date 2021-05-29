import React, { useContext, useEffect, useState } from "react";
import "./CurrentSongField.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
import SaveSongButton from "../SaveSongButton/SaveSongButton";

//Functions
import getCurrentlyPlayingSong from "../../../Functions/getCurrentlyPlayingSong";

//Context
import RefreshContext from "../../../Context/RefreshContext";
import AudioPlayerSourceContext from "../../../Context/AudioPlayerSourceContext";

export default function AddSongField(props) {
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({});

  const { refresh } = useContext(RefreshContext);
  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  const loadSongs = async () => {
    const response = await getCurrentlyPlayingSong();
    console.log(response);

    if (response.responseStatus === 401) {
      console.log("Is not logged in!");
    } else if (response.responseStatus === 204) {
      setSongIsPlaying(false);
    } else if (response.responseStatus === 200) {
      setSongInfo(response);
      setSongIsPlaying(true);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
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
          <SaveSongButton
            songInfo={songInfo}
            currentListenerInfo={props.currentListenerInfo}
          />
        </>
      )}
    </div>
  );
}
