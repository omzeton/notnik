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
				<h2>Ja prdele... To działa. Naprawdę działa i zrobiłem to sam.</h2>
				<ul>
					<li className="blue">Firebase database permissions for users.</li>
					<li>After logout redirect to splash page.</li>
					<li>Splash page for unregistered users. Make it shiny!</li>
					<li>Stay logged after refresh.</li>
					<li>Loading screen is a must.</li>
				</ul>
			</div>
		</div>
	);
};

export default objectives;