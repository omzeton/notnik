import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';

import firebase from '@firebase/app';
import { storage } from '@firebase/storage';
import { database } from '@firebase/database';
import './Menu.css';

const config = {
	apiKey: "AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A",
	    authDomain: "notnik-app.firebaseapp.com",
	    databaseURL: "https://notnik-app.firebaseio.com",
	    projectId: "notnik-app",
	    storageBucket: "notnik-app.appspot.com",
	    messagingSenderId: "813392804298"
	  };
firebase.initializeApp(config);
const firebaseStorage = firebase.storage();


class Menu extends Component {
	saveHandler = () => {

		let currentIndex = this.props.index;
		let crtEntry;
		this.props.onGetId(currentIndex);
		let toExport = this.props.toExport;
		toExport.id = currentIndex;

		let arr = this.props.imported;

		let data = Object.keys(arr).map(key => {
			return arr[key];
		});

		data.map(el => {
		// eslint-disable-next-line
			if(el.id == currentIndex) {
				crtEntry = el;
			}
			return crtEntry;
		});

		let copy = toExport;

		copy.header = toExport.header ? toExport.header : crtEntry.header;
		copy.day = toExport.day ? toExport.day : crtEntry.day;
		copy.hour = toExport.hour ? toExport.hour : crtEntry.hour;
		copy.month = toExport.month ? toExport.month : crtEntry.month;
		copy.textBody = toExport.textBody ? toExport.textBody : crtEntry.textBody;
		copy.year = toExport.year ? toExport.year : crtEntry.year;
		copy.img = toExport.img ? toExport.img : crtEntry.img;

		// The problem here is that when there is no sample from databse to work with
		// There is nothing to assign the new value from
		// Becasue it doesnt exist when creating new entry

		// copy
		let imageUrl;
		let key;
		firebase.database().ref('notes').push(copy)
			.then((data) => {
				key = data.key
				return key
			})
			.then(key => {
				const filename = copy.img.name
				const ext = filename.slice(filename.lastIndexOf('.'))
				return firebase.storage().ref('note-img/' + key + '.' + ext).put(copy.img)
			})
			.then(fileData => {
				imageUrl = fileData.metadata.downloadURLs
				return firebase.database().ref('notes').child(key).update({img: imageUrl})
				console.log(imageUrl)
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {

		let saveStyles = null;
		if(this.props.location.pathname === '/') {
			saveStyles = ['button', 'button-save', 'disable'].join(' ');
		} else {
			saveStyles = ['button', 'button-save'].join(' ');
		}

		let entryPath = null;

		if (this.props.index == null) {
			entryPath = '/';
		} else {
			entryPath = '/entry/' + this.props.index
		}

		return (
			<div className="Menu">
			<div></div>

			<NavLink to="/" exact><div className={['button', 'button-list'].join(' ')}></div></NavLink>
			<NavLink to={entryPath} exact><div className={['button', 'button-entry'].join(' ')}></div></NavLink>
			<div className={saveStyles} onClick={this.saveHandler}></div>
			<div></div>
		</div>
		);
	}
};

const mapStateToProps = state => {
  return {
      index: state.currentIndex,
      imported: state.import,
      toExport: state.export
  };
};

const mapDispatchToProps = dispatch => {
	return {
		onGetId: (cargo) => dispatch(actionCreators.getId(cargo))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));