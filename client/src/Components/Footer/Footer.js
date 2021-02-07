import React from "react";
import "./Footer.css";

import { ReactComponent as Dots } from "./Dots.svg";
import { ReactComponent as Line } from "./Line.svg";

const Footer = () => {
  return (
    <div className="footer">
      <Dots className="dots" />
      <div className="lineAndTextContainer">
        <Line className="line" />
        <p>Made by Jakub Smetana</p>
      </div>
    </div>
  );
};

export default Footer;
