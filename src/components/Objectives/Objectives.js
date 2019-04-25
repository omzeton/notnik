import React, { useState } from 'react';
import './Objectives.css';

const objectives = props => {

	let [modal, toggleModal] = useState('');

	const modalHanlder = () => {
		toggleModal(modal = !modal);
	};

	return (
		<div className="Objectives" style={modal ? { right: "0em" } : { right: "-30em"}}>
			<div className="show">
				<div className="Objectives--toggle" onClick={modalHanlder}></div>
				<ul>
					<li>Load bar at the top border of screen to indicate if entry was saved!</li>
					<li>Alert upon clicking delete button looks ugly.</li>
					<li>Media qureies</li>
					<li>Browser compability</li>
				</ul>
			</div>
		</div>
	);
};

export default objectives;