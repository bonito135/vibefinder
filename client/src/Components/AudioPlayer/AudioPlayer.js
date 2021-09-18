import React, { useEffect, useRef, useState, useContext } from "react";
import "./AudioPlayer.css";

//Functions
import getCurrentlyPlayingSong from "../../Functions/getCurrentlyPlayingSong";

//Context
import RefreshContext from "../../Context/RefreshContext";
import AudioPlayerSourceContext from "../../Context/AudioPlayerSourceContext";

//Imgs
import playButton from "./playButton.png";
import pauseButton from "./pauseButton.png";

export default function AudioPlayer(props) {
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [isPreviewURL, setIsPreviewURL] = useState(false);

  const { audioPlayerSource } = useContext(AudioPlayerSourceContext);
  const { refresh } = useContext(RefreshContext);

  const audioRef = useRef(null);
  const _isMounted = useRef(true);

  const playSong = async () => {
    if (audioRef.current !== null && _isMounted.current) {
      await audioRef.current.play();
      setMusicIsPlaying(true);
    }
  };

  const pauseSong = async () => {
    if (audioRef.current !== null && _isMounted.current) {
      await audioRef.current.pause();
    }

    setMusicIsPlaying(false);
  };

  const getSong = async () => {
    if (audioPlayerSource === "currentSong" && _isMounted.current) {
      const response = await getCurrentlyPlayingSong();

      if (
        response.responseStatus === 200 &&
        response.preview_url &&
        _isMounted.current
      ) {
        audioRef.current = new Audio(await response.preview_url);
        audioRef.current.volume = 0.2;
        setIsPreviewURL(true);
      } else {
        setIsPreviewURL(false);
      }
    } else if (audioPlayerSource !== "currentSong" && _isMounted.current) {
      if (props.preview_url) {
        audioRef.current = new Audio(await props.preview_url);
        audioRef.current.volume = 0.2;
        setIsPreviewURL(true);
      } else {
        setIsPreviewURL(false);
      }
    }
  };

  useEffect(() => {
    getSong();

    return () => {
      _isMounted.current = false;
      pauseSong();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    getSong();

    return () => {
      _isMounted.current = false;
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
