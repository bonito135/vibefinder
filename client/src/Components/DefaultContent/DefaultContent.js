import React from "react";
import "./defaultContent.css";

//Components
import MainText from "./MainText/MainText";
import TheLastSavedSongs from "./The-last-saved-songs/The-last-saved-songs";

export default function DefaultContent() {
  return (
    <div className="defaultContent">
      <MainText />
      <TheLastSavedSongs />
    </div>
  );
}
