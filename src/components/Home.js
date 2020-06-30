import React from "react";
import fire from "../config/Fire";

const Home = ({ user }) => {
  function logout() {
    fire.auth().signOut();
  }

  return (
    <div>
      <h1>This is the home page!</h1>
      <p>You are logged in as {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
