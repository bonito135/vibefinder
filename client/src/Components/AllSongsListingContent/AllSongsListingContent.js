import React, { useContext, useEffect, useState, useRef } from "react";
import "./AllSongsListingContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

//Functions
import getInfoOfPreviousSongsAndListeners from "../../Functions/getInfoOfPreviousSongsAndListeners";

//Context
import RefreshContext from "../../Context/RefreshContext";
import AudioPlayerSourceContext from "../../Context/AudioPlayerSourceContext";

export default function AllSongsListingContent() {
  const [previousSongsAndListenersInfo, setPreviousSongsAndListenersInfo] =
    useState([]);

  const _isMounted = useRef(true);

  const { refresh } = useContext(RefreshContext);
  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  useEffect(() => {
    if (_isMounted.current) {
      setAudioPlayerSource("allSharedSongs");

      const loadSongs = async () => {
        const response = await getInfoOfPreviousSongsAndListeners();

        if (response.responseStatus === 200 && _isMounted.current) {
          setPreviousSongsAndListenersInfo(response.responseInJSON);
        }
      };

      loadSongs();
    }

    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    if (_isMounted.current) {
      setAudioPlayerSource("allSharedSongs");

      const loadSongs = async () => {
        const response = await getInfoOfPreviousSongsAndListeners();

        if (response.responseStatus === 200 && _isMounted.current) {
          setPreviousSongsAndListenersInfo(response.responseInJSON);
        }
      };

      loadSongs();
    }

    return () => {
      _isMounted.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="allSongsListingContent">
      <ArrowField />
      <div className="allSongsField">
        {previousSongsAndListenersInfo.map((info) => (
          <div className="allSongsTileContainer">
            <div className="allSongsTile" key={info._id}>
              <div className="allSongsTileUserPart">
                <img
                  className="userImg"
                  src={info.imageURLOfListener[0].url}
                  alt="userImg"
                ></img>
                <p className="userName">{info.nameOfListener}</p>
                <p className="userCountry">{info.countryOfListener}</p>
              </div>

              <div className="allSongsTileArtistsPart">
                {info.artists.map((artist) => (
                  <a className="artistName" href={artist.uri} key={artist.id}>
                    {artist.name}
                  </a>
                ))}
              </div>

              <div className="allSongsTileSongPart">
                <a className="albumAnchor" href={info.album.uri}>
                  <img
                    className="albumImg"
                    src={info.album.images[2].url}
                    alt="album"
                  ></img>
                </a>
                <p className="songName">{info.song}</p>
                {info.preview_url && (
                  <AudioPlayer preview_url={info.preview_url} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
