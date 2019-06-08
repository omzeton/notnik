import React from "react";

import Auth from "../Auth/Auth";

import "./Splash.css";

const Splash = props => {
  return (
    <div className="Splash">
      <div className="Splash__Left">
        <div className="Splash__Left__Text">
          <h2>Notnik</h2>
          <h3>arguably simplest journal app ever</h3>
          <p>
            Have you ever had a train of thoughts? Or simply wanted to write
            down a memory for later? Or maybe you had something special happen
            to you and you wanted to write about it to get better grasp of what
            just happened. You've come to the right place then. Simply register
            an account and start writing. We'll save everything for you. Never
            miss out on an opportunity to write about what you want.
          </p>
        </div>
      </div>
      <div className="Splash__Right">
        <Auth
          error={props.error}
          onClearError={props.errorHandler}
          authLoading={props.authLoading}
          onLogin={props.onLogin}
          onSignup={props.onSignup}
        />
      </div>
    </div>
  );
};

export default Splash;
