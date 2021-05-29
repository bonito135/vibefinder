import React, { useEffect, useContext } from "react";
import "./AddSongContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import LoginScreen from "../LoginScreen/LoginScreen";
import AddSongFieldTypeSwitch from "./AddSongFieldTypeSwitch/AddSongFieldTypeSwitch";
import SearchSongField from "./SearchSongField/SearchSongField";
import CurrentSongField from "./CurrentSongField/CurrentSongField";

//Context
import AddSongFieldTypeContext from "../../Context/AddSongFieldTypeContext";

export default function AddSongContent(props) {
  const { addSongFieldType } = useContext(AddSongFieldTypeContext);

  const AddSongField = () => {
    if (!props.isLoggedIn) {
      return <LoginScreen />;
    }

    if (addSongFieldType === "searchSongField") {
      return (
        <SearchSongField
          isLoggedIn={props.isLoggedIn}
          currentListenerInfo={props.currentListenerInfo}
        />
      );
    } else if (addSongFieldType === "currentSongField") {
      return (
        <CurrentSongField
          isLoggedIn={props.isLoggedIn}
          currentListenerInfo={props.currentListenerInfo}
        />
      );
    }
  };

  useEffect(() => {
    //console.log(props.isLoggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div className="addSongContent">
      <ArrowField />
      <AddSongFieldTypeSwitch />

      <AddSongField />
    </div>
  );
}
