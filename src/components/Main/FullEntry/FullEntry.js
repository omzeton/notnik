import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Loader from "../Loader/Loader";
import Head from "./Head/Head";
import Body from "./Body/Body";

import "./FullEntry.css";

const FullEntry = props => {
  const [fetchStatus, setFetchStatus] = useState({
    entry: null,
    loading: true,
    error: false
  });

  const [newEntryDataBody, setNewEntryDataBody] = useState({
    newEntry: {
      body: null,
      id: props.match.params.id,
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
      imgUrl: null
    }
  });

  useEffect(() => {
    const entryId = props.match.params.id;
    fetch(`http://localhost:8080/journal/entry/${entryId}`, {
      method: "GET"
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Failed fetching note with this id!");
        }
        return res.json();
      })
      .then(resData => {
        setFetchStatus({ entry: resData.entry, loading: false });
        const merged = {
          newEntry: {
            title: resData.entry.title,
            body: resData.entry.body,
            year: resData.entry.date.split("-")[0],
            month: resData.entry.date.split("-")[1],
            day: resData.entry.date.split("-")[2],
            time: resData.entry.date.split(" - ")[1],
            imgUrl: resData.entry.imgUrl,
            uId: null
          }
        };
        props.onRegisterChange(merged);
      })
      .catch(err => {
        setFetchStatus({ error: true });
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      const merged = {
        newEntry: {
          ...newEntryDataHead.newEntry,
          ...newEntryDataBody.newEntry
        }
      };
      props.onRegisterChange(merged);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newEntryDataBody, newEntryDataHead]
  );

  let currentPath = props.loc.pathname;
  let result = fetchStatus.error ? (
    <h2>Oops! Something went wrong.</h2>
  ) : (
    <Loader />
  );

  if (!fetchStatus.loading) {
    let imgUrl =
      fetchStatus.entry.imgUrl === "noimage"
        ? "http://localhost:8080/images/noimage"
        : "http://localhost:8080/" + fetchStatus.entry.imgUrl;
    result = (
      <>
        <Head
          prevState={newEntryDataHead}
          location={currentPath}
          onSetNewData={setNewEntryDataHead}
          title={fetchStatus.entry.title}
          date={fetchStatus.entry.date}
          imgUrl={imgUrl}
        />
        <Body
          prevState={newEntryDataBody}
          location={currentPath}
          onSetNewData={setNewEntryDataBody}
          body={fetchStatus.entry.body}
        />
      </>
    );
  }

  return <div className="FullEntry">{result}</div>;
};

export default withRouter(FullEntry);
