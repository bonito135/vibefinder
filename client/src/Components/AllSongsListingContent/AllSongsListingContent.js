import React, { useContext, useEffect, useState } from "react";
import "./AllSongsListingContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

//Functions
import getInfoOfPreviousSongsAndListeners from "../../Functions/getInfoOfPreviousSongsAndListeners";

//Context
import RefreshContext from "../../Context/RefreshContext";

export default function AllSongsListingContent() {
  const [
    previousSongsAndListenersInfo,
    setPreviousSongsAndListenersInfo,
  ] = useState([]);

  const { refresh } = useContext(RefreshContext);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const loadSongs = async () => {
        const response = await getInfoOfPreviousSongsAndListeners();
        console.log(response);

        if (response.responseStatus === 204) {
          console.log(response);
        } else if (response.responseStatus === 200) {
          if (isMounted)
            setPreviousSongsAndListenersInfo(response.responseInJSON);
        }
      };
      loadSongs();
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const loadSongs = async () => {
        const response = await getInfoOfPreviousSongsAndListeners();
        console.log(response);

        if (response.responseStatus === 204) {
          console.log(response);
        } else if (response.responseStatus === 200) {
          if (isMounted)
            setPreviousSongsAndListenersInfo(response.responseInJSON);
        }
      };
      loadSongs();
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="allSongsListingContent">
      <ArrowField />
      <div className="allSongsField">
        {previousSongsAndListenersInfo.map((info) => (
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
        ))}
      </div>
    </div>
  );
}