import React, { useState } from "react";
import "./SaveSongButton.css";

// Gifs
import LoadingGif from "./circles-menu-1.gif";
import CheckmarkGif from "./check-circle.gif";

// Functions
import saveSongAndListenerToDatabase from "../../../Functions/saveSongAndListenerToDatabase";

export default function SaveSongButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const saveSong = async (e) => {
    setIsLoading(true);

    const currentListener = props.currentListenerInfo;
    let songInfo = props.songInfo;

    const sort_by_date = new Date().getTime();

    const saveSongResponse = await saveSongAndListenerToDatabase(
      songInfo.name,
      songInfo.artists,
      songInfo.album,
      songInfo.preview_url,
      currentListener.display_name,
      currentListener.country,
      currentListener.images,
      sort_by_date
    );

    if (saveSongResponse.responseStatus === 200) {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const ButtonAndGifSwitch = () => {
    if (isLoading) {
      return (
        <div className="buttonContainer">
          <img src={LoadingGif} alt="loading"></img>;
        </div>
      );
    }

    if (isLoaded) {
      return (
        <div className="buttonContainer">
          <img src={CheckmarkGif} alt="checkmark"></img>;
        </div>
      );
    }

    return (
      <div className="buttonContainer">
        <button id={props.id} onClick={saveSong}>
          save
        </button>
      </div>
    );
  };

  return (
    <div className="saveSongButton">
      <ButtonAndGifSwitch />
    </div>
  );
}
