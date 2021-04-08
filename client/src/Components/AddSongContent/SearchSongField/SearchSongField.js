import React, { useEffect, useState, useContext } from "react";
import "./SearchSongField.css";

//Components
import AudioPlayer from "../../AudioPlayer/AudioPlayer";

//Context
import AddSongFieldTypeContext from "../../../Context/AddSongFieldTypeContext";
import AudioPlayerSourceContext from "../../../Context/AudioPlayerSourceContext";

//Functions
import searchForASong from "../../../Functions/searchForASong";
import getCurrentListener from "../../../Functions/getCurrentListener";
import saveSongAndListenerToDatabase from "../../../Functions/saveSongAndListenerToDatabase";

export default function SearchSongField() {
  const [hasFoundSongs, setHasFoundSongs] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const [searchSongInput, setSearchSongInput] = useState("");
  const { setAddSongFieldType } = useContext(AddSongFieldTypeContext);
  const { setAudioPlayerSource } = useContext(AudioPlayerSourceContext);

  const searchSong = async () => {
    const response = await searchForASong(searchSongInput);

    console.log(response);

    if (response.responseStatus === 200) {
      setSongsList(response?.responseToReturn);

      setHasFoundSongs(true);
    }

    if (response.responseStatus !== 200) {
      setHasFoundSongs(false);
    }
  };

  const handleSearchSongInput = (e) => {
    setSearchSongInput(e.target.value);
  };

  const saveSong = async (e) => {
    const currentListener = await getCurrentListener();
    console.log(currentListener);

    const sort_by_date = new Date().getTime();

    const songInfo = songsList.find((song) => song.id === e.target.id);

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
    setAddSongFieldType("searchSongField");
    setAudioPlayerSource("searchSong");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <div className="songTile">
              <img alt="albumPic" src={song?.album?.images[0]?.url}></img>
              <p>{song?.name}</p>

              <AudioPlayer preview_url={song?.preview_url} />
              <button id={song?.id} onClick={saveSong} className="shareButton">
                Share
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p id="hasNotFound">Has not found anything yet</p>
      )}
    </div>
  );
}
