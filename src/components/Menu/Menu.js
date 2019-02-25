import React from 'react';
import HomeButton from '../HomeButton/HomeButton';
import SaveButton from '../SaveButton/SaveButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import './Menu.css';

const Menu = (props) => {
	return (
		<div className="Menu">
			<div></div>
			<HomeButton />
			<SaveButton />
			<SettingsButton />
			<div></div>
		</div>
	);
};

export default Menu;