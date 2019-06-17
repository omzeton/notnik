import React, { useState, useEffect, Fragment } from "react";
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
    const token = localStorage.getItem("token");
    const entryId = props.match.params.id;
    fetch(`https://notnik-api.herokuapp.com/journal/entry/${entryId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
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
    <Loader auth={false} />
  );

  if (!fetchStatus.loading) {
    let imgUrl =
      fetchStatus.entry.imgUrl === "noimage"
        ? "https://notnik-api.herokuapp.com/images/noimage"
        : "https://notnik-api.herokuapp.com/" + fetchStatus.entry.imgUrl;
    result = (
      <Fragment>
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
          fontSize={props.fontSize}
        />
      </Fragment>
    );
  }

  return <div className="FullEntry">{result}</div>;
};

export default withRouter(FullEntry);
