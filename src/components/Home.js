import React from "react";
import fire from "../config/Fire";

const Home = () => {
  function logout() {
    fire.auth().signOut();
  }

  return (
    <div>
      <h1>You are home!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
