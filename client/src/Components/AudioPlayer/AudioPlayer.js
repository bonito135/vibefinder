import React, { useEffect, useRef, useState, useContext } from "react";
import "./AudioPlayer.css";

//Functions
import getCurrentlyPlayingSong from "../../Functions/getCurrentlyPlayingSong";

//Context
import RefreshContext from "../../Context/RefreshContext";

//Imgs
import playButton from "./playButton.png";
import pauseButton from "./pauseButton.png";

export default function AudioPlayer(props) {
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [isPreviewURL, setIsPreviewURL] = useState(false);
  const { refresh } = useContext(RefreshContext);
  const audioRef = useRef(null);

  const playSong = async () => {
    if (!musicIsPlaying) {
      await audioRef.current.play();
      setMusicIsPlaying(true);
    }
  };

  const pauseSong = async () => {
    if (musicIsPlaying) {
      await audioRef.current.pause();
      setMusicIsPlaying(false);
    }
  };

  const getSong = async () => {
    if (props.component === "addSong") {
      const response = await getCurrentlyPlayingSong();
      console.log(response);

      if (response.responseStatus === 200 && response.preview_url) {
        const audioTag = new Audio(await response.preview_url);
        audioRef.current = audioTag;
        setIsPreviewURL(true);
      } else {
        setIsPreviewURL(false);
      }
    } else if (props.component !== "addSong") {
      if (props.preview_url) {
        const audioTag = new Audio(await props.preview_url);
        audioRef.current = audioTag;
        setIsPreviewURL(true);
      } else {
        setIsPreviewURL(false);
      }
    }
  };

  useEffect(() => {
    getSong();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    getSong();

    return () => {
      pauseSong();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AudioSwitch = () => {
    if (isPreviewURL && !musicIsPlaying) {
      return (
        <>
          <img
            className="playPauseButton"
            onClick={playSong}
            src={playButton}
            alt="play"
          ></img>
        </>
      );
    } else if (isPreviewURL && musicIsPlaying) {
      return (
        <>
          <img
            className="playPauseButton"
            onClick={pauseSong}
            src={pauseButton}
            alt="pause"
          ></img>
        </>
      );
    } else {
      return <p>No preview to play</p>;
    }
  };

  return (
    <div className="audioPlayer">
      <AudioSwitch />
    </div>
  );
}
