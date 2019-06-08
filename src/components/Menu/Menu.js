import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import "./Menu.css";

const Menu = props => {
  let saveBtnStyle,
    btnStyle = props.isAuth ? "Menu__Btn" : ["Menu__Btn", "Disable"].join(" ");

  if (
    props.location.pathname === "/" ||
    props.location.pathname === "/settings"
  ) {
    saveBtnStyle = ["Menu__Btn", "Disable"].join(" ");
  } else {
    saveBtnStyle = "Menu__Btn";
  }

  return (
    <div className="Menu">
      <div />

      <NavLink to="/create-new-entry" className={btnStyle} />

      <NavLink to="/" exact className={btnStyle} />

      <div onClick={props.createNewEntry} className={saveBtnStyle} />

      <NavLink to="/settings" exact className={btnStyle} />

      <div />
    </div>
  );
};

export default withRouter(Menu);
