import React, { useState } from "react";
import fire from "../config/Fire";
import validation from "../schema/validation";

const Login = () => {
  const [field, setField] = useState({
    name: "",
    age: "",
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

    let validateInfo = await validation(field);
    console.log(validateInfo);

    if (validateInfo.valid) {
      fire
        .auth()
        .createUserWithEmailAndPassword(field.email, field.password)
        .catch((err) => {
          setFireErrors(err.message);
        });
    } else {
      let formatMessage =
        validateInfo.message.slice(0, 1).toUpperCase() +
        validateInfo.message.slice(1);
      setFireErrors(formatMessage);
    }
  }

  function getAction(action) {
    if (action === "reg") {
      setFormTitle("Register New User");
      setLoginBtn(false);
    } else {
      setFormTitle("Login");
      setLoginBtn(true);
    }

    setFireErrors("");
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
            <>
              <input
                type="text"
                value={field.name}
                placeholder="Name"
                onChange={(e) =>
                  setField({ ...field, [e.target.name]: e.target.value })
                }
                name="name"
              />

              <input
                type="number"
                value={field.age}
                placeholder="Age"
                onChange={(e) =>
                  setField({
                    ...field,
                    [e.target.name]: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                name="age"
              />
            </>
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
