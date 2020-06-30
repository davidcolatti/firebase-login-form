import React, { useState } from "react";
import fire from "../config/Fire";
import validation from "../schema/validation";

const Login = () => {
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fireErrors, setFireErrors] = useState(null);
  const [formTitle, setFormTitle] = useState("Login");
  const [loginBtn, setLoginBtn] = useState(true);

  function login(e) {
    e.preventDefault();

    fire
      .auth()
      .signInWithEmailAndPassword(field.email, field.password)
      .catch((err) => {
        setFireErrors(err.message);
      });
  }

  async function register(e) {
    e.preventDefault();

    let invalid = await validation(field);

    if (invalid) {
      let formatInvalid = invalid.slice(0, 1).toUpperCase() + invalid.slice(1);
      setFireErrors(formatInvalid);
    } else {
      fire
        .auth()
        .createUserWithEmailAndPassword(field.email, field.password)
        .catch((err) => {
          setFireErrors(err.message);
        });
    }
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
          {formTitle === "Register New User" && (
            <input
              type="text"
              value={field.name}
              placeholder="Name"
              onChange={(e) =>
                setField({ ...field, [e.target.name]: e.target.value })
              }
              name="name"
            />
          )}

          <input
            type="text"
            placeholder="Email"
            value={field.email}
            onChange={(e) =>
              setField({ ...field, [e.target.name]: e.target.value })
            }
            name="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={field.password}
            onChange={(e) =>
              setField({ ...field, [e.target.name]: e.target.value })
            }
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
