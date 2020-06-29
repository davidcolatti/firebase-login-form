import React, { useState, useEffect } from "react";
import "./App.css";
import fire from "./config/Fire";

import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authListener();
  }, []);

  function authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }

  return <div>{user ? <Home /> : <Login />}</div>;
};

export default App;
