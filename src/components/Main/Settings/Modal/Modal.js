import React from "react";

import ResetPassword from "../ResetPassword/ResetPassword";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import FontSize from "../FontSize/FontSize";
import MenuPosition from "../MenuPosition/MenuPosition";

import "./Modal.css";

const Modal = props => {
  let form;
  switch (props.type) {
    case "reset":
      form = <ResetPassword uId={props.userId} />;
      break;
    case "delete":
      form = <DeleteAccount deletion={props.deletion} uId={props.userId} />;
      break;
    case "font":
      form = <FontSize uId={props.userId} />;
      break;
    case "menu":
      form = <MenuPosition uId={props.userId} />;
      break;
    default:
      break;
  }

  let style = props.show ? { opacity: 1 } : { opacity: 0 };

  return (
    <div className="Options__Modal" style={style}>
      {form}
    </div>
  );
};

export default Modal;
