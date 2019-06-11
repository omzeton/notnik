import React, {useState} from "react";

import './MenuPosition.css';

const MenuPosition = props => {
  const [menuPos, setMenuPos] = useState(props.defaultMenuPosition);

  const menuHandler = event => {
    props.onMenuPosition(event.target.value);
    setMenuPos(event.target.value);
  };
  return (
    <div className="MenuPosition__Container">
      <div className="Select__Container">
        <select onChange={event => menuHandler(event)} defaultValue={menuPos}>
          <option value="left">Left</option>
          <option value="top">Top</option>
          <option value="right">Right</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>
    </div>
  );
};

export default MenuPosition;