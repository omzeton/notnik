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
    saveBtnStyle = ["Menu__Btn"].join(" ");
  }

  let menuGrid = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr repeat(4, 3em) 1fr",
    gridRowGap: "2em"
  };
  const menu = document.querySelector(".Menu .Menu__Btn:nth-child(6)");

  if (menu !== null) {
    switch (props.menuPosition) {
      case "left":
      case "right":
        menuGrid = {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr repeat(4, 3em) 1fr",
          gridRowGap: "2em"
        };
        break;
      case "top":
      case "bottom":
        menuGrid = {
          gridTemplateColumns: "1fr repeat(4, 3em) 1fr",
          gridTemplateRows: "1fr",
          gridColumnGap: "2em"
        };
        break;
      default:
        break;
    }
  }

  return (
    <div className="Menu" style={{ ...menuGrid, ...props.position }}>
      <div />

      <NavLink to="/create-new-entry" className={btnStyle} />

      <NavLink to="/" exact className={btnStyle} />

      <div onClick={props.createNewEntry} className={saveBtnStyle} />
      <div className="Save__Error" />

      <NavLink to="/settings" exact className={btnStyle} />

      <div />
    </div>
  );
};

export default withRouter(Menu);
