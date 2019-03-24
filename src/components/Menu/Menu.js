import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {

	saveHandler = () => {
		console.log(this.props.toExport);

		// axios.post('https://notnik-app.firebaseio.com/notes.json', newProperty, axiosConfig)
		// 	.then(response => {
		// 		console.log('Stage 2 : Posting the form');
		// 		console.log(newProperty);
		// 		console.log(response);
		// 	}).catch(error => {
		// 		console.log('failed at stage 2');
		// 		console.log(error);
		// 	});
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
      toExport: state.toExport
  };
};

export default withRouter(connect(mapStateToProps, null)(Menu));