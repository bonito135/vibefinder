import React, { useState, useEffect } from "react";
import "./Main.css";

//Components
import Header from "../Header/Header";
import DefaultContent from "../DefaultContent/DefaultContent";
import AddSongContent from "../../Components/AddSongContent/AddSongContent";
import AllSongsListingContent from "../../Components/AllSongsListingContent/AllSongsListingContent";
import Footer from "../Footer/Footer";

//Context
import RefreshContext from "../../Context/RefreshContext";
import MainContentContext from "../../Context/MainContentContext";
import AddSongFieldTypeContext from "../../Context/AddSongFieldTypeContext";
import AudioPlayerSourceContext from "../../Context/AudioPlayerSourceContext";

// Functions
import getCurrentListener from "../../Functions/getCurrentListener";

const Main = (props) => {
  const [refresh, setRefresh] = useState(true);
  const [mainContent, setMainContent] = useState("");
  const [audioPlayerSource, setAudioPlayerSource] = useState("");
  const [addSongFieldType, setAddSongFieldType] = useState("searchSongField");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentListenerInfo, setCurrentListenerInfo] = useState({});

  const MainContentSwitch = () => {
    if (mainContent === "") {
      return <DefaultContent />;
    } else if (mainContent === "AddSongContent") {
      return (
        <AddSongContent
          isLoggedIn={isLoggedIn}
          currentListenerInfo={currentListenerInfo}
        />
      );
    } else if (mainContent === "AllSongsListingContent") {
      return <AllSongsListingContent />;
    }
  };

  useEffect(() => {
    let checkUser = true;

    if (checkUser) {
      const getUser = async () => {
        const currentUser = await getCurrentListener();

        if (currentUser.responseStatus === 200) {
          setIsLoggedIn(true);
          setCurrentListenerInfo(currentUser);
        } else {
          setIsLoggedIn(false);
          setCurrentListenerInfo(null);
        }
      };

      getUser();
    }

    console.log(currentListenerInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <RefreshContext.Provider value={{ refresh, setRefresh }}>
        <MainContentContext.Provider value={{ mainContent, setMainContent }}>
          <Header />
          <AddSongFieldTypeContext.Provider
            value={{ addSongFieldType, setAddSongFieldType }}
          >
            <AudioPlayerSourceContext.Provider
              value={{ audioPlayerSource, setAudioPlayerSource }}
            >
              <MainContentSwitch />
            </AudioPlayerSourceContext.Provider>
            <Footer />
          </AddSongFieldTypeContext.Provider>
        </MainContentContext.Provider>
      </RefreshContext.Provider>
    </div>
  );
};

export default Main;
