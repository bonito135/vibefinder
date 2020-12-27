import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const getRecentlyPlayed = () => {
    fetch("http://localhost:5000/spotify/functions/recentlyPlayed")
      .then((response) => response.text())
      .then((json) => console.log(json));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="http://localhost:5000/spotify/auth/login">login</a>

        <div>
          <button onClick={getRecentlyPlayed}>Recently played</button>
        </div>
      </header>
    </div>
  );
}

export default App;
