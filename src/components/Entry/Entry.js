import React from 'react';

import './Entry.css';

function Entry(props) {

  let orgText = props.text;
  let previewText = orgText.slice(0, 75);
  previewText += "...";

  return (
    <div className="Entry">
    	<div className="Entry__Img" style={{backgroundImage: 'url(' + props.img + ')'}}></div>
    	<div className="Entry__Info">
    		<h2>{props.header}</h2>
    		<h3>{props.year}.{props.month}.{props.day}</h3>
    		<h4>{previewText}</h4>
    	</div>
    </div>
  );
};

export default Entry;