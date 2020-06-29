import React, { useState } from "react";
import fire from "../config/Fire";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fireErrors, setFireErrors] = useState(null);
  const [formTitle, setFormTitle] = useState("Login");
  const [loginBtn, setLoginBtn] = useState(true);

  function login(e) {
    e.preventDefault();

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        setFireErrors(err.message);
      });
  }

  function register(e) {
    e.preventDefault();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        setFireErrors(err.message);
      });
  }

  function getAction(action) {
    if (action === "reg") {
      setFormTitle("Register New User");
      setLoginBtn(false);
      setFireErrors("");
    } else {
      setFormTitle("Login");
      setLoginBtn(true);
      setFireErrors("");
    }
  }

  let errorNotification = fireErrors && (
    <div className="Error">{fireErrors}</div>
  );

  let submitBtn = loginBtn ? (
    <input className="loginBtn" type="submit" onClick={login} value="Enter" />
  ) : (
    <input
      className="loginBtn"
      type="submit"
      onClick={register}
      value="Register"
    />
  );

  let login_register = loginBtn ? (
    <button className="registerBtn" onClick={() => getAction("reg")}>
      Register
    </button>
  ) : (
    <button className="registerBtn" onClick={() => getAction("login")}>
      Login
    </button>
  );

  return (
    <div className="form_block">
      <div id="title">{formTitle}</div>
      <div className="body">
        {errorNotification}
        <form>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          {submitBtn}
        </form>
        {login_register}
      </div>
    </div>
  );
};

export default Login;
