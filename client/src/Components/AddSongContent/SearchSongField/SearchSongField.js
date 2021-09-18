import React, { useEffect, useState, useContext, useRef } from "react";
import "./SearchSongField.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";
import SaveSongButton from "../SaveSongButton/SaveSongButton";

//Context
import AudioPlayerSourceContext from "../../../Context/AudioPlayerSourceContext";

//Functions
import searchForASong from "../../../Functions/searchForASong";

export default function SearchSongField(props) {
  const [hasFoundSongs, setHasFoundSongs] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [searchSongInput, setSearchSongInput] = useState("");
  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  const _isMounted = useRef(true);

  const searchSong = async () => {
    const response = await searchForASong(searchSongInput);

    if (response.responseStatus === 200 && _isMounted.current) {
      setSongsList(response?.responseToReturn);

      setHasFoundSongs(true);
    }

    if (response.responseStatus !== 200 && _isMounted.current) {
      setHasFoundSongs(false);
    }
  };

  const handleSearchSongInput = (e) => {
    setSearchSongInput(e.target.value);
  };

  useEffect(() => {
    if (_isMounted.current) {
      setAudioPlayerSource("searchSong");
    }

    return () => {
      _isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className="searchSongField">
      <h2>Search for a song</h2>
      <input type="text" onChange={handleSearchSongInput}></input>
      <button onClick={searchSong} className="searchButton">
        Search
      </button>

      {hasFoundSongs ? (
        <div className="songsList">
          {songsList?.map((song) => (
            <div className="songTile" key={song?.id}>
              <img
                className="albumPic"
                alt="albumPic"
                src={song?.album?.images[0]?.url}
              ></img>
              <p>{song?.name}</p>

              <AudioPlayer preview_url={song?.preview_url} />

              <SaveSongButton
                id={song?.id}
                songInfo={{
                  name: song.name,
                  artists: song.artists,
                  album: song.album,
                  preview_url: song.preview_url,
                }}
                currentListenerInfo={props.currentListenerInfo}
              />
            </div>
          ))}
        </div>
      ) : (
        <p id="hasNotFound">Has not found anything yet</p>
      )}
    </div>
  );
}
