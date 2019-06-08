import React, { useState, useEffect } from "react";

// import Loader from "../Loader/Loader";

import "./Auth.css";

const Auth = props => {
  const [authMode, setAuthMode] = useState("log");
  const [form, setForm] = useState({
    email: {
      value: ""
    },
    password: {
      value: ""
    },
    repeatPassword: {
      value: ""
    }
  });
  const [errorMsg, setErrorMsg] = useState({opacity: '0'});

  useEffect(() => {
    if (props.error) {
      setErrorMsg({opacity:'1'});
    }
  }, [props.error]);

  const toggleAuthMode = () => {
    if (authMode === "log") {
      setAuthMode("sign");
    } else {
      setAuthMode("log");
    }
  };

  const formHandler = event => {
    switch (event.target.name) {
      case "password":
        setForm({
          ...form,
          password: {
            value: event.target.value
          }
        });
        break;
      case "email":
        setForm({
          ...form,
          email: {
            value: event.target.value
          }
        });
        break;
      case "repeatPassword":
        setForm({
          ...form,
          repeatPassword: {
            value: event.target.value
          }
        });
        break;
      default:
        return;
    }
  };

  const hideErrorMsg = () => {
    setErrorMsg({opacity: '0'});
    props.onClearError();
  };

  let header = authMode === "log" ? "Log in" : "Register";

  let buttons =
    authMode === "log" ? (
      <div className="Auth__Container__Buttons">
        <input type="submit" value="Log In" onFocus={hideErrorMsg} />
        <div className="button" onFocus={hideErrorMsg} onClick={toggleAuthMode}>
          <p>Register</p>
        </div>
      </div>
    ) : (
      <div className="Auth__Container__Buttons">
        <input type="submit" value="Register" onFocus={hideErrorMsg} />
        <div className="button" onFocus={hideErrorMsg} onClick={toggleAuthMode}>
          <p>Back</p>
        </div>
      </div>
    );

  let password =
    authMode === "log"
      ? [
          <input
            type="password"
            name="password"
            onFocus={hideErrorMsg}
            placeholder="Password"
            onChange={formHandler}
            key="i1"
          />
        ]
      : [
          <input
            type="password"
            name="password"
            onFocus={hideErrorMsg}
            onChange={formHandler}
            placeholder="Password"
            key="i2"
          />,
          <input
            type="password"
            onChange={formHandler}
            onFocus={hideErrorMsg}
            name="repeatPassword"
            placeholder="Repeat password"
            key="i3"
          />
        ];

  let errorWarning = props.error ? <p>{props.error.message || props.error}</p> : <p />;

  let formSubmission =
    authMode === "log"
      ? e => props.onLogin(e, form)
      : e => props.onSignup(e, form);

  return (
    <div className="Auth">
      <div className="Auth">
        <div className="Auth__Container">
          <form onSubmit={formSubmission}>
            <div className="Auth__Container__Heading">
              <h2>{header}</h2>
            </div>
            <input
              type="email"
              onFocus={hideErrorMsg}
              placeholder="Email address"
              onChange={formHandler}
              name="email"
            />
            {password}
            {buttons}
            <div className="Auth__Container__Popup" style={errorMsg}>{errorWarning}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
