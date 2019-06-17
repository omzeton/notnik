import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./Entry.css";

const Entry = props => {
  const [opacity, setOpacity] = useState({ opacity: 1, display: "grid" });

  const fadeOut = () => {
    setOpacity({ opacity: 0 });
    setTimeout(() => {
      setOpacity({ display: "none" });
    }, 600);
  };

  const redirectToFull = () => {
    props.history.push(`/entry/${props.id}`);
  };

  const onDelete = event => {
    const token = localStorage.getItem("token");
    if (!event) {
      event.cancelBubble = true;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (window.confirm("Are you sure you wish to delete this entry?")) {
      fetch(`https://notnik-api.herokuapp.com/journal/entry/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(res => {
          if (res.status !== 201) {
            throw new Error("Failed to delete entry with this id.");
          }
          fadeOut();
          return res.json();
        })
        .then(resData => {
          return console.log(resData);
          // return window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  let year = props.date.split("-")[0],
    month = props.date.split("-")[1],
    day = props.date.split("-")[2];

  let body;

  if (props.body.length > 125) {
    body = props.body.slice(0, 125);
    body += "...";
  } else {
    body = props.body;
  }

  return (
    <div className="Entry" onClick={redirectToFull} style={opacity}>
      <div
        className="Entry__Img"
        style={{ backgroundImage: `url(${props.imgUrl})` }}
      />
      <div className="Entry__Info">
        <div className="Entry__Info--Delete" onClick={onDelete} />
        <h2>{props.title}</h2>
        <h3>
          {year} <span>-</span> {month} <span>-</span> {day}
        </h3>
        <div className="Entry__Text">{body}</div>
      </div>
    </div>
  );
};

export default withRouter(Entry);
