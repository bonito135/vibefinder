import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { ReactComponent as MusicAddIcon } from "./004-music.svg";
import { ReactComponent as MusicListIcon } from "./037-music-file.svg";

//Functions
import getCurrentListener from "../../Functions/getCurrentListener";

//Context
import LoginContext from "../../Context/LoginContext";
import MainContentContext from "../../Context/MainContentContext";

const Header = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setMainContent } = useContext(MainContentContext);

  const [currentListenerInfo, setCurrentListenerInfo] = useState({});

  const setAddSongContent = () => {
    setMainContent("AddSongContent");
  };

  const setAllSongsListingContent = () => {
    setMainContent("AllSongsListingContent");
  };

  useEffect(() => {
    let checkUser = true;

    if (checkUser) {
      const getUser = async () => {
        const currentUser = await getCurrentListener();

        if (currentUser.responseStatus === 200) {
          setCurrentListenerInfo(currentUser);
        } else if (currentUser.responseStatus === 401) {
          setIsLoggedIn(false);
        }
      };
      getUser();
    }

    return () => {
      checkUser = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      {currentListenerInfo.responseStatus === 200 ? (
        <div className="listenerInfo">
          <img src={`${currentListenerInfo.images[0].url}`} alt="user"></img>
          <p>{currentListenerInfo.display_name}</p>
        </div>
      ) : (
        <div className="listenerInfo"></div>
      )}

      <div className="icons">
        <MusicAddIcon onClick={setAddSongContent} />
        <MusicListIcon onClick={setAllSongsListingContent} />
      </div>
    </div>
  );
};

export default Header;
