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

const Main = (props) => {
  const [refresh, setRefresh] = useState(true);
  const [mainContent, setMainContent] = useState("");

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
          <MainContentSwitch />
          <Footer />
        </MainContentContext.Provider>
      </RefreshContext.Provider>
    </div>
  );
};

export default Main;
