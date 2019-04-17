import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '@firebase/app';
// eslint-disable-next-line
import { database } from '@firebase/database';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Entry.css';

class Entry extends Component {

  onClick = () => {
    this.props.history.push(`/entry/${this.props.id}`);
  }

  onDelete = (e) => {
      if (!e) { e.cancelBubble = true; }
      if (e.stopPropagation) { e.stopPropagation(); }
      if (window.confirm('Are you sure you wish to delete this item?')) {
        firebase.database().ref('notes').child(this.props.fKey).remove();
        firebase.database().ref('notes').on('value', () => { this.props.onFetchSamples(this.props.token); });
        console.log('re-fetching entries after deletion...');
        this.props.history.push(`/`);
      }
    }

  extractContent(s) {
    const span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  render() {
      let orgText = this.props.text;
      let previewText;
      if(orgText.length > 75) {
        previewText = orgText.slice(0, 75);
        previewText += "...";
      } else {
        previewText = this.props.text;
      }
      previewText = this.extractContent(previewText);
    return (
      <div className="Entry" onClick={this.onClick} ref={(el) => this.whole = el}>
        <div className="Entry__Img" style={{backgroundImage: 'url(' + this.props.img + ')'}}></div>
        <div className="Entry__Info">
          <div className="Entry--Delete" ref={(el) => this.delete = el} onClick={this.onDelete}></div>
          <h2>{this.props.header}</h2>
          <h3>{this.props.year}.{this.props.month}.{this.props.day}</h3>
          <div className="Entry__Text">{previewText}</div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
      token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSamples: (token) => dispatch(actionCreators.fetchSamples(token))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Entry));