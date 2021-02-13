import React, { useState, useEffect } from "react";
import "./AddSongContent.css";

//Components
import ArrowField from "../ArrowField/ArrowField";
import AddSongField from "./AddSongField/AddSongField";
import LoginScreen from "../LoginScreen/LoginScreen";

//Context
import LoginContext from "../../Context/LoginContext";

//Functions
import getCurrentListener from "../../Functions/getCurrentListener";

export default function AddSongContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div className="addSongContent">
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <ArrowField />
        {isLoggedIn ? <AddSongField /> : <LoginScreen />}
      </LoginContext.Provider>
    </div>
  );
}
