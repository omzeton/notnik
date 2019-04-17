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
					<li>Stay logged after refresh.</li>
					<li>Load bar at the top border of screen to indicate if entry was saved!</li>
					<li>After register and List is shown populate it with example entries.</li>
					<li>Alert upon clicking delete button looks ugly.</li>
					<li>Following the style of background, sample bgs for new entry. 5 different colors and shapes.</li>
				</ul>
			</div>
		</div>
	);
};

export default objectives;