import React from 'react';
import Auth from '../../containers/Auth/Auth';
import './Start.css';

function start() {
	return (
		<div className="Start">
			<div className="Start__Header">
				<h2>Notnik</h2>
			</div>
			
			<Auth />
		</div>
	);
}

export default start;