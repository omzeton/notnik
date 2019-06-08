import React, { useEffect, useState } from "react";

import "./Head.css";

const Head = props => {
  useEffect(() => {
    let year = props.date.split("-")[0],
      month = props.date.split("-")[1],
      day = props.date.split("-")[2],
      time = props.date.split(" - ")[1],
      imgUrl = props.imgUrl.split("8080/")[1];
    const update = {
      newEntry: {
        ...props.prevState.newEntry,
        title: props.title,
        year: year,
        month: month,
        day: day,
        time: time,
        imgUrl: imgUrl
      }
    };
    props.onSetNewData(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [previewImg, setPreviewImg] = useState({
    previewImg: undefined
  });

  const onUpdate = event => {
    let focus = event.target.name;
    switch (focus) {
      case "title":
        props.onSetNewData({
          newEntry: {
            ...props.prevState.newEntry,
            title: event.target.value
          }
        });
        break;
      case "year":
        props.onSetNewData({
          newEntry: {
            ...props.prevState.newEntry,
            year: event.target.value
          }
        });
        break;
      case "month":
        props.onSetNewData({
          newEntry: {
            ...props.prevState.newEntry,
            month: event.target.value
          }
        });
        break;
      case "day":
        props.onSetNewData({
          newEntry: {
            ...props.prevState.newEntry,
            day: event.target.value
          }
        });
        break;
      case "hour":
        props.onSetNewData({
          newEntry: {
            ...props.prevState.newEntry,
            hour: event.target.value
          }
        });
        break;
      default:
        return;
    }
  };

  const imgHandler = event => {
    event.preventDefault();
    const files = event.target.files[0];
    const fileReader = new FileReader();
    props.onSetNewData({
      newEntry: {
        ...props.prevState.newEntry,
        imgUrl: files
      }
    });
    fileReader.addEventListener("load", () => {
      setPreviewImg({ previewImg: fileReader.result });
    });
    fileReader.readAsDataURL(files);
  };

  let imageInput;
  let headBg = previewImg.previewImg === undefined ? props.imgUrl : previewImg.previewImg;

  return (
    <div
      className="Entry__Head"
      style={{ backgroundImage: `url(${headBg})` }}
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        defaultValue={props.title}
        onChange={onUpdate}
        className={["Input--NoStyling", "Input__Title"].join(" ")}
      />
      <div className="Entry__Head__Date__Container">
        {/* Year */}
        <input
          type="text"
          name="year"
          defaultValue={props.date.split("-")[0]}
          onChange={onUpdate}
          maxLength="4"
          className={["Input--NoStyling", "Input__Date"].join(" ")}
        />
        <span>-</span>
        {/* Month */}
        <input
          type="text"
          name="month"
          defaultValue={props.date.split("-")[1]}
          onChange={onUpdate}
          maxLength="2"
          className={["Input--NoStyling", "Input__Date"].join(" ")}
        />
        <span>-</span>
        {/* Day */}
        <input
          type="text"
          name="day"
          defaultValue={props.date.split("-")[2]}
          onChange={onUpdate}
          maxLength="2"
          className={["Input--NoStyling", "Input__Date"].join(" ")}
        />
        {/* Time */}
        <input
          type="text"
          name="time"
          defaultValue={props.date.split(" - ")[1]}
          onChange={onUpdate}
          maxLength="5"
          className={["Input--NoStyling", "Input__Date"].join(" ")}
        />
      </div>
      {/* Background Image */}
      <input
        type="file"
        style={{ display: "none" }}
        ref={input => (imageInput = input)}
        onChange={imgHandler}
      />
      <button className="Input__Img" onClick={() => imageInput.click()} />
    </div>
  );
};

export default Head;
