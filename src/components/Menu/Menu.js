import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
	saveHandler = () => {

		let currentIndex = this.props.index;
		let crtEntry = null;
		this.props.onGetId(currentIndex);
		let toExport = this.props.toExport;
		toExport.id = currentIndex;

		let arr = this.props.imported;

		let data = Object.keys(arr).map(key => {
			return arr[key];
		});

		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				"Access-Control-Allow-Origin": "*",
			}
		}

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
		copy.img = crtEntry.img;

		console.log(copy);
		axios.post('https://notnik-app.firebaseio.com/notes.json', copy, axiosConfig)
			.then(response => {
				console.log(response);
			}).catch(error => {
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