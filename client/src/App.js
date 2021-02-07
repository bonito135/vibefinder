import React, { useEffect, useState } from "react";

//Components
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import Main from "./Components/Main/Main";

//Functions
import getCurrentListener from "./Functions/getCurrentListener";

//Context
import LoginContext from "./Context/LoginContext";

//Style
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    let checkLogin = true;

    if (checkLogin) {
      const loginCheck = async () => {
        const currentListener = await getCurrentListener();

        if (currentListener.responseStatus === 401) {
          setIsLoggedIn(false);
        } else if (currentListener.responseStatus === 200) {
          setIsLoggedIn(true);
        }
      };

      loginCheck();
    }

    return () => {
      checkLogin = false;
    };
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Main />
        </LoginContext.Provider>
      ) : (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <LoginScreen />
        </LoginContext.Provider>
      )}
    </div>
  );
}

export default App;
