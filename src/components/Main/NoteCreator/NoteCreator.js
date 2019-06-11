import React, { useState, useEffect } from "react";

import Head from "../FullEntry/Head/Head";
import Body from "../FullEntry/Body/Body";

import { withRouter } from "react-router-dom";

import "./NoteCreator.css";

const NoteCreator = props => {
  const [newEntryDataBody, setNewEntryDataBody] = useState({
    newEntry: {
      body: null,
      id: "not-assigned",
      uId: null
    }
  });

  const [newEntryDataHead, setNewEntryDataHead] = useState({
    newEntry: {
      title: null,
      year: null,
      month: null,
      day: null,
      time: null,
      imgUrl: null,
    }
  });

  useEffect(
    () => {
      if (props.loc.pathname === "/create-new-entry") {
        const merged = {
          newEntry: {
            ...newEntryDataHead.newEntry,
            ...newEntryDataBody.newEntry
          }
        }
        props.onRegisterChange(merged);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newEntryDataBody, newEntryDataHead]
  );

  function getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let minutes = today.getMinutes();
    let hours = today.getHours();
    let yyyy = today.getFullYear();
    let date;

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    date = yyyy + "-" + mm + "-" + dd + " - " + hours + ":" + minutes;

    return date;
  }

  let currentPath = props.loc.pathname;

  return (
    <div className="NewEntry">
      <Head
        prevState={newEntryDataHead}
        location={currentPath}
        onSetNewData={setNewEntryDataHead}
        title="A new memory"
        date={getCurrentDate()}
        imgUrl="http://localhost:8080/images/noimage"
      />
      <Body
        prevState={newEntryDataBody}
        location={currentPath}
        onSetNewData={setNewEntryDataBody}
        fontSize={props.fontSize}
        body="So..."
      />
    </div>
  );
};

export default withRouter(NoteCreator);
