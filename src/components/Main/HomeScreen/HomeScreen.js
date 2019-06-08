import React from 'react';

import HomeEntries from '../HomeEntries/HomeEntires';

import './HomeScreen.css';

const HomeScreen = props => {

	return (
		<div className="HomeScreen">
			<HomeEntries currentUser={props.currentUser} />
			<p className="copyright">Made with love by Doria, Ior and Adam - &copy; 2019</p>
		</div>
	);
};

export default HomeScreen;