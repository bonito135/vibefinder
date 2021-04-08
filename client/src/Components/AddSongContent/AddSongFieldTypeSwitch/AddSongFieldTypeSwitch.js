import React, { useContext } from "react";
import "./AddSongFieldTypeSwitch.css";

import AddSongFieldTypeContext from "../../../Context/AddSongFieldTypeContext";

export default function AddSongFieldTypeSwitch() {
  const { setAddSongFieldType } = useContext(AddSongFieldTypeContext);

  const setCurrentFieldType = () => {
    setAddSongFieldType("currentSongField");
  };

  const setSearchFieldType = () => {
    setAddSongFieldType("searchSongField");
  };

  return (
    <div className="addSongFieldTypeSwitch">
      <button onClick={setCurrentFieldType}>
        <h3>current</h3>
      </button>

      <button onClick={setSearchFieldType}>
        <h3>search</h3>
      </button>
    </div>
  );
}
