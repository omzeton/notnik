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
					<li>Display the same on all devices</li>
					<li>Columns with dynamic rows to fill up the screen (margin maybe?)</li>
					<li>If note is not saved and user wants to close tab alert</li>
					<li>Confirmation email? :)</li>
					<li>Font size controls</li>
					<li>Sort by date</li>
				</ul>
			</div>
		</div>
	);
};

export default objectives;