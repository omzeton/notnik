import React, { useState, useEffect } from "react";

import Entry from "../Entry/Entry";
import Loader from "../Loader/Loader";

import "./HomeEntires.css";

const HomeEntries = props => {
  const [stillFetching, setStillFetching] = useState(true);
  const [entryState, setEntryState] = useState([]);
  const [loadingError, setLoadingError] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://notnik-api.herokuapp.com/journal/entries", {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res);
        if ((res.status !== 200) & (res.status !== 201)) {
          throw new Error("Failed to fetch entries.");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setStillFetching(false);
        setEntryState(resData.entries);
      })
      .catch(err => {
        setLoadingError(err);
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let fetched = loadingError ? (
    <h2 className="Connection_Refused">Connection error.</h2>
  ) : (
    <Loader auth={false} />
  );

  if (!stillFetching) {
    fetched = entryState.map(en => {
      let imgUrl =
        en.imgUrl === "noimage"
          ? "https://notnik-api.herokuapp.com/images/noimage"
          : "https://notnik-api.herokuapp.com/" + en.imgUrl;
      return (
        <Entry
          key={en._id}
          id={en._id}
          date={en.date}
          imgUrl={imgUrl}
          title={en.title}
          body={en.body}
        />
      );
    });
  }

  return <div className="List">{fetched}</div>;
};

export default HomeEntries;
