import React, { useState } from "react";
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

const Main = (props) => {
  const [refresh, setRefresh] = useState(true);
  const [mainContent, setMainContent] = useState("");
  const [audioPlayerSource, setAudioPlayerSource] = useState("");
  const [addSongFieldType, setAddSongFieldType] = useState("searchSongField");

  const MainContentSwitch = () => {
    if (mainContent === "") {
      return <DefaultContent />;
    } else if (mainContent === "AddSongContent") {
      return <AddSongContent />;
    } else if (mainContent === "AllSongsListingContent") {
      return <AllSongsListingContent />;
    }
  };

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
