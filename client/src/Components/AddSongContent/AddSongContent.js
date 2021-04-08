import React, { useState, useEffect, useContext } from "react";
import "./AddSongContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import LoginScreen from "../LoginScreen/LoginScreen";
import AddSongFieldTypeSwitch from "./AddSongFieldTypeSwitch/AddSongFieldTypeSwitch";
import SearchSongField from "./SearchSongField/SearchSongField";
import CurrentSongField from "./CurrentSongField/CurrentSongField";

//Context
import LoginContext from "../../Context/LoginContext";
import AddSongFieldTypeContext from "../../Context/AddSongFieldTypeContext";

//Functions
import getCurrentListener from "../../Functions/getCurrentListener";

export default function AddSongContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { addSongFieldType } = useContext(AddSongFieldTypeContext);

  useEffect(() => {
    const loginUser = async () => {
      const userData = await getCurrentListener();

      if (userData.responseStatus === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    loginUser();
  }, []);

  const AddSongField = () => {
    if (!isLoggedIn) {
      return <LoginScreen />;
    }

    if (addSongFieldType === "searchSongField") {
      return <SearchSongField />;
    } else if (addSongFieldType === "currentSongField") {
      return <CurrentSongField />;
    }
  };

  return (
    <div className="addSongContent">
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ArrowField />
        <AddSongFieldTypeSwitch />

        <AddSongField />
      </LoginContext.Provider>
    </div>
  );
}
