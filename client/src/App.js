import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/auth/spotify/actionRequest")
      .then((response) => console.log(response.json()))
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="http://localhost:5000/auth/spotify/login">link</a>
      </header>
    </div>
  );
}

export default App;
