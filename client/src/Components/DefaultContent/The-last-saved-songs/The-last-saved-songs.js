import React, { useContext, useEffect, useRef, useState } from "react";
import "./The-last-saved-songs.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

//Context
import AudioPlayerSourceContext from "../../../Context/AudioPlayerSourceContext";

//Functions
import getInfoOfPreviousSongsAndListeners from "../../../Functions/getInfoOfPreviousSongsAndListeners";

const TheLastSavedSongs = () => {
  const [previousSongsAndListenersInfo, setPreviousSongsAndListenersInfo] =
    useState([]);

  const _isMounted = useRef(true);

  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  const checkForSongs = async () => {
    const infoOfPreviousSongsAndListeners =
      await getInfoOfPreviousSongsAndListeners(4);

    if (
      infoOfPreviousSongsAndListeners.responseStatus === 200 &&
      _isMounted.current
    ) {
      setPreviousSongsAndListenersInfo(
        infoOfPreviousSongsAndListeners.responseInJSON
      );
    }
  };

  useEffect(() => {
    if (_isMounted.current) {
      checkForSongs();
      setAudioPlayerSource("lastSongs");
    }

    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lastSongsField">
      <div className="lastSongsTileField">
        <p className="lastSongsText">The last saved songs</p>

        {previousSongsAndListenersInfo.map((info) => (
          <div className="lastSongsTile" key={info._id}>
            <img
              className="userImg"
              src={info.imageURLOfListener[0].url}
              alt="userImg"
            ></img>
            <p>{info.song}</p>
            {info.preview_url && <AudioPlayer preview_url={info.preview_url} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheLastSavedSongs;
