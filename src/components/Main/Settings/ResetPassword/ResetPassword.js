import React, { useState } from "react";

import Loader from '../../Loader/Loader';

import "./ResetPassword.css";

const ResetPassword = props => {
  const [formData, setFormData] = useState({
    newPassword: "",
    repeatPassword: "",
    uId: props.uId
  });

  const [fetchError, setFetchError] = useState({
    error: null
  });

  const [loading, setLoading] = useState(false);

  const formHandler = event => {
    switch (event.target.name) {
      case "newPassword":
        setFormData({
          ...formData,
          newPassword: event.target.value
        });
        break;
      case "repeatPassword":
        setFormData({
          ...formData,
          repeatPassword: event.target.value
        });
        break;
      default:
        break;
    }
  };

  const onChangePassword = (event, form) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    setLoading(true);
    fetch("https://notnik-api.herokuapp.com/auth/password-change", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({
        newPassword: form.newPassword,
        repeatPassword: form.repeatPassword,
        uId: form.uId
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(resData => {
        setLoading(false);
        setFetchError({
          error: resData.message
        });
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
        setFetchError({
          error: err
        });
      });
  };

  let errorwarning = fetchError ? <p>{fetchError.error}</p> : <p />;

  return (
    <form
      onSubmit={event => onChangePassword(event, formData)}
      className="ResetPassword__Form"
    >
      <div className="Form__Heading">
        <h2>Type your new password</h2>
      </div>
      <input
        type="password"
        placeholder="New password"
        onChange={formHandler}
        name="newPassword"
      />
      <input
        type="password"
        placeholder="Repeat password"
        onChange={formHandler}
        name="repeatPassword"
      />
      <input type="submit" />
      <div
        className="Error__Popup"
        style={fetchError.error ? { opacity: 1 } : { opacity: 0 }}
      >
        {loading ? <Loader auth={true} /> : errorwarning}
      </div>
    </form>
  );
};

export default ResetPassword;
