import React, { useContext } from "react";
import "./ArrowField.css";

//Context
import MainContentContext from "../../Context/MainContentContext";
import RefreshContext from "../../Context/RefreshContext";

//imgs
import arrowLogo from "./Arrow.png";
import refreshLogo from "./Refresh.png";

export default function ArrowField() {
  const { setMainContent } = useContext(MainContentContext);
  const { refresh, setRefresh } = useContext(RefreshContext);

  const setDefaultContent = () => {
    setMainContent("");
  };

  const refreshContent = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="arrowField">
      <img onClick={setDefaultContent} src={arrowLogo} alt="arrow"></img>
      <img onClick={refreshContent} src={refreshLogo} alt="refresh"></img>
    </div>
  );
}
