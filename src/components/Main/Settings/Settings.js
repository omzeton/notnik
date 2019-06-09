import React from "react";

import "./Settings.css";

const Settings = props => {
  return (
    <div className="Settings__Container">
      <div className="Settings">
        <h2>Settings</h2>
        <div className="Settings__Categories">
          <p>Reset password</p>
          <p>Delete account</p>
          <p>Font size</p>
          <p>Selection color</p>
          <p>Menu bar position</p>
        </div>
        <form onSubmit={event => props.onLogout(event)}>
          <input type="submit" value="Log out" />
        </form>
      </div>
    </div>
  );
};

export default Settings;
