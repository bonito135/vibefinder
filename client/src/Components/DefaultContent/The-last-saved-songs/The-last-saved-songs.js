import React, { useEffect, useState } from "react";
import "./The-last-saved-songs.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

//Functions
import getInfoOfPreviousSongsAndListeners from "../../../Functions/getInfoOfPreviousSongsAndListeners";

const TheLastSavedSongs = () => {
  const [
    previousSongsAndListenersInfo,
    setPreviousSongsAndListenersInfo,
  ] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const checkForSongs = async () => {
        const infoOfPreviousSongsAndListeners = await getInfoOfPreviousSongsAndListeners(
          5
        );

        if (infoOfPreviousSongsAndListeners.responseStatus === 200) {
          if (isMounted)
            setPreviousSongsAndListenersInfo(
              infoOfPreviousSongsAndListeners.responseInJSON
            );
        }
      };
      checkForSongs();
    }

    return () => {
      isMounted = false;
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
