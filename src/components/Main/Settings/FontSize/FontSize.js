import React, { useState } from "react";

import "./FontSize.css";

const FontSize = props => {
  const [fontSize, setFontSize] = useState({ fontSize: "0.9rem" });

  const fontHandler = event => {
    setFontSize({ fontSize: event.target.value });
  };

  return (
    <div className="FontSize__Container">
      <div className="Select__Container">
        <select onChange={event => fontHandler(event)} defaultValue="0.9rem">
          <option value="0.7rem">06</option>
          <option value="0.8rem">08</option>
          <option value="0.9rem">10</option>
          <option value="1rem">12</option>
          <option value="1.1rem">14</option>
        </select>
      </div>
      <div className="FontSize__Preview" style={fontSize}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt
          quam non magna blandit varius. Nunc dapibus nisl non vehicula
          condimentum. Vivamus sagittis, enim nec posuere rhoncus, ipsum magna
          consequat mauris, eu mattis magna dui a felis. Nulla vel eros laoreet,
          pellentesque nulla id, iaculis nunc. Nunc venenatis nunc vel
          sollicitudin convallis.
        </p>
      </div>
    </div>
  );
};

export default FontSize;
