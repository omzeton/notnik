import React from 'react';

import './Entry.css';

function Entry(props) {

  let orgText = props.text;
  let previewText;
  if(orgText.length > 75) {
    previewText = orgText.slice(0, 75);
    previewText += "...";
  } else {
    previewText = props.text;
  }

  return (
    <div className="Entry">
    	<div className="Entry__Img" style={{backgroundImage: 'url(' + props.img + ')'}}></div>
    	<div className="Entry__Info">
    		<h2>{props.header}</h2>
    		<h3>{props.year}.{props.month}.{props.day}</h3>
    		<div className="Entry__Text">{previewText}</div>
    	</div>
    </div>
  );
};

export default Entry;