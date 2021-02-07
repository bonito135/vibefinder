import React from "react";
import "./AddSongContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import AddSongField from "./AddSongField/AddSongField";

export default function AddSongContent() {
  return (
    <div className="addSongContent">
      <ArrowField />
      <AddSongField />
    </div>
  );
}
