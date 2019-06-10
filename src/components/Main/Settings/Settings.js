import React, { useState } from "react";

import Modal from './Modal/Modal';

import "./Settings.css";

const Settings = props => {

  const [options, setOptions] = useState({
    type: null,
    show: false
  });

  const setType = (e) => {
    const type = e.currentTarget.dataset.name;
    setOptions({type: type, show: true});
  }

  return (
    <div className="Settings__Container">
      <div className="Settings">
        <h2 className="Settings__Heading">Settings</h2>
        <div className="Settings__Categories">
          <p onClick={setType} data-name="reset">Reset password</p>
          <p onClick={setType} data-name="delete">Delete account</p>
          <p onClick={setType} data-name="font">Font size</p>
          <p onClick={setType} data-name="color">Selection color</p>
          <p onClick={setType} data-name="menu">Menu bar position</p>
        </div>
        <form onSubmit={event => props.onLogout(event)}>
          <input type="submit" value="Log out" className="Settings__Logout"/>
        </form>
        <Modal deletion={props.deletion} userId={props.userId} type={options.type} show={options.show}/>
      </div>
    </div>
  );
};

export default Settings;
