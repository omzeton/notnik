import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';

import firebase from '@firebase/app';
// eslint-disable-next-line
import { storage } from '@firebase/storage';
// eslint-disable-next-line
import { database } from '@firebase/database';
import './Menu.css';

class Menu extends Component {

	state = {
		method: null,
		loading: false,
		error: false,
		crtImg: this.props.toExport.img
	}

	componentDidUpdate() {
		console.log('updated');
	}

	saveHandler = () => {

		let currentIndex = this.props.index;
		let crtEntry;
		this.props.onGetId(currentIndex);
		let toExport = this.props.toExport;
		toExport.id = currentIndex;
		let copy = toExport;


		// eslint-disable-next-line
		if (this.props.location.pathname == '/newEntry') {
			// copy.header = this.props.header;
		} else {

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

			

			copy.header = toExport.header ? toExport.header : crtEntry.header;
			copy.day = toExport.day ? toExport.day : crtEntry.day;
			copy.hour = toExport.hour ? toExport.hour : crtEntry.hour;
			copy.month = toExport.month ? toExport.month : crtEntry.month;
			copy.textBody = toExport.textBody ? toExport.textBody : crtEntry.textBody;
			copy.year = toExport.year ? toExport.year : crtEntry.year;
			copy.img = toExport.img ? toExport.img : crtEntry.img;
			copy.fKey = this.props.noteFId;
			copy.userId = this.props.userId;

		}

				// copy
				let imageUrl;
				let key;
				let newFirebaseKey;	
				// If user creates new entry store it as separate one in database
				// eslint-disable-next-line
				if ( this.props.location.pathname == '/newEntry' ) {
					this.setState({method: 'POST'})
					console.log('Creating a new entry...');
					this.setState({error: false});
					this.setState({loading: true});
					copy.userId = this.props.userId;
					// Creates new entry
					firebase.database().ref('notes').push(copy)
						.then((data) => {
							key = data.key
							newFirebaseKey = data.key
							return key
						})
						.then(key => {
							const filename = copy.img.name
							const ext = filename.slice(filename.lastIndexOf('.'))
							return firebase.storage().ref('note-img/' + key + '.' + ext).put(copy.img)
						})
						.then(fileData => {
							imageUrl = firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
							return imageUrl
						})
						.then(url => {
							console.log("Note created! <3");
							return firebase.database().ref('notes').child(key).update({img: url, fKey: newFirebaseKey})
						})
						.catch((error) => {
							this.setState({error: true})
							console.log(error);
						});
					// After entry is created switch route to the id
					// to prevent infinite creation of entries
					setTimeout(() => {
						if (!this.state.error) {
							this.setState({loading: false});
							this.props.history.push(`/entry/${this.props.index}`);
						} else {
							this.setState({loading: false});
							this.props.history.push(`/`);
						}
					}, 3000);
					
					

				// If user is not on /newEntry route it means he's editing already
				// existing entry, so don't create a new one!
				} else {			
					let oldState = this.state.crtImg
					let newState = copy.img;		
					// Edits existing entry
					console.log(oldState) // Old
					console.log(newState); // New
					// if (oldState !== newState) {
					// 	let existingKey = copy.fKey;
					// 	let newImgUrl;
					// 	firebase.database().ref('notes').child(copy.fKey).update(copy)
					// 		.then(key => {
					// 			const filename = copy.img.name
					// 			const ext = filename.slice(filename.lastIndexOf('.'))
					// 			console.log('2');
					// 			return firebase.storage().ref('note-img/' + existingKey + '.' + ext).put(copy.img);
					// 		})
					// 		.then(fileData => {
					// 			imageUrl = firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
					// 			newImgUrl = imageUrl;
					// 			console.log('3');
					// 			return imageUrl
					// 		})
					// 		.then(url => {
					// 			console.log('Note edited! <3<3')
					// 			return firebase.database().ref('notes').child(existingKey).update({img: newImgUrl.i})
					// 		})
					// 		.catch((error) => {
					// 			this.setState({error: true})
					// 			console.log(error);
					// 		});
					// } else {
					// 	firebase.database().ref('notes').child(copy.fKey).update(copy)
					// 		.then(response => {
					// 			console.log(response);
					// 			return response;
					// 		})
					// 		.catch((err) => {
					// 			console.log(err);
					// 			return err;
					// 		})
					// }
				}
	}

	render() {

		let loader = this.state.error ? null : <Loader />;
		let loadingMsg = this.state.error ? <h2 style={{color: 'var(--rd)'}}>Whoops! Your entry could not be saved!</h2> : <h2>Uploading data . . . </h2>;
		let loadingScreen = this.state.loading ? <div className="waitForNewEntry">{loader}{loadingMsg}</div> : null;

		let saveStyles = null;
		if(this.props.location.pathname === '/') {
			saveStyles = ['button', 'button-save', 'disable'].join(' ');
		} else {
			saveStyles = ['button', 'button-save'].join(' ');
		}

		let start = this.props.isSignedIn ? null : 'disable';

		let entryPath = null;

		if (this.props.index == null) {
			entryPath = '/';
		} else {
			entryPath = '/entry/' + this.props.index
		}

		return (
			<div className="Menu">
			{loadingScreen}
			<div></div>

			<NavLink to="/" exact className={start}><div className={['button', 'button-list'].join(' ')}></div></NavLink>
			<NavLink to={entryPath} exact className={start}><div className={['button', 'button-entry'].join(' ')}></div></NavLink>
			<div className={saveStyles} onClick={() => {this.saveHandler()}}></div>
			
			<div></div>
		</div>
		);
	}
};

const mapStateToProps = state => {
  return {
      index: state.currentIndex,
      imported: state.import,
      toExport: state.export,
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId,
      noteFId: state.export.fKey
  };
};

const mapDispatchToProps = dispatch => {
	return {
		onGetId: (cargo) => dispatch(actionCreators.getId(cargo))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));