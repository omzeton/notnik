import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '@firebase/app';
// eslint-disable-next-line
import { database } from '@firebase/database';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Entry.css';

const entry = props => {

  const pushHistory = () => {
    props.history.push(`/entry/${props.id}`);
  }

  const deleteEntry = e => {
      if (!e) { e.cancelBubble = true; }
      if (e.stopPropagation) { e.stopPropagation(); }
      if (window.confirm('Are you sure you wish to delete this item?')) {
        firebase.database().ref('notes').child('users').child(props.userId).child(props.fKey).remove();
        firebase.database().ref('notes').on('value', () => { props.onFetchSamples(props.token); });
        console.log('re-fetching entries after deletion...');
        props.history.push(`/`);
      }
    }

  const checkIfTooLong = str => {
    let output;
    if(str.length > 75) {
      output = str.slice(0, 75);
      output += "...";
    } else {
      output = str;
    }
    return output;
  }

  const extractContent = s => {
    const span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

      let previewText = checkIfTooLong(props.text),
          prevHeader = checkIfTooLong(props.header);

      previewText = extractContent(previewText);

    return (
      <div className="Entry" onClick={pushHistory}>
        <div className="Entry__Img" style={{backgroundImage: 'url(' + props.img + ')'}}></div>
        <div className="Entry__Info">
          <div className="Entry--Delete" onClick={deleteEntry}></div>
          <h2>{prevHeader}</h2>
          <h3>{props.year} <span>-</span> {props.month} <span>-</span> {props.day}</h3>
          <div className="Entry__Text">{previewText}</div>
        </div>
      </div>
    );
};

const mapStateToProps = state => {
  return {
      token: state.auth.token,
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSamples: (token) => dispatch(actionCreators.fetchSamples(token))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(entry));