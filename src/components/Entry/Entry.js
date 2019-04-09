import React, { Component } from 'react';
import firebase from '@firebase/app';
// eslint-disable-next-line
import { database } from '@firebase/database';

import './Entry.css';

class Entry extends Component {

  onDelete(e) {
      console.log(this.props.fKey);
      firebase.database().ref('notes').child(this.props.fKey).remove();
  }
  render() {
      let orgText = this.props.text;
      let previewText;
      if(orgText.length > 75) {
        previewText = orgText.slice(0, 75);
        previewText += "...";
      } else {
        previewText = this.props.text;
      }
    return (
      <div className="Entry">
        <div className="Entry__Img" style={{backgroundImage: 'url(' + this.props.img + ')'}}></div>
        <div className="Entry__Info">
          <div className="Entry--Delete" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onDelete() } }></div>
          <h2>{this.props.header}</h2>
          <h3>{this.props.year}.{this.props.month}.{this.props.day}</h3>
          <div className="Entry__Text">{previewText}</div>
        </div>
      </div>
    );
  }
};

export default Entry;