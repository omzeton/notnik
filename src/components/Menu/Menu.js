import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
	return (
		<div className="Menu">
			<div></div>

			<NavLink to="/" exact><div className={['button', 'button-list'].join(' ')}></div></NavLink>
			<NavLink to="/newEntry" exact><div className={['button', 'button-entry'].join(' ')}></div></NavLink>
			<div className={['button', 'button-save'].join(' ')}></div>
			
			<div></div>
		</div>
	);
};

export default Menu;