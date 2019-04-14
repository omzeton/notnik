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
					<li>Stay logged after refresh.</li>
					<li>Loading screen is a must.</li>
					<li>Ask for password 2 times when registering.</li>
					<li>After register and List is shown populate it with example entries.</li>
					<li>Alert upon clicking delete button looks ugly.</li>
					<li>That wallpaper in bg of Splash.. Let's make it more stylish!</li>
				</ul>
			</div>
		</div>
	);
};

export default objectives;