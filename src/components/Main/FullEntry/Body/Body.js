import React, { useEffect } from "react";

import "./Body.css";

const Body = props => {
  useEffect(() => {
    props.onSetNewData({
      newEntry: {
        ...props.prevState.newEntry,
        body: props.body
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdate = event => {
    props.onSetNewData({
      newEntry: { ...props.prevState.newEntry, body: event.target.value }
    });
  };

  return (
    <div className="Entry__Body">
      {/* Body */}
      <textarea
        className={["Input--NoStyling", "Input__Body"].join(" ")}
        style={{fontSize: props.fontSize}}
        onChange={onUpdate}
        defaultValue={props.body}
      />
    </div>
  );
};

export default Body;
