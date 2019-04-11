import React, { Component } from 'react';
import './Objectives.css';

class Objectives extends Component {
	state = {
		showModal: false
	}
	toggleModal = () => {
		let crt = this.state.showModal;
		this.setState({showModal: !crt});
	}
		render() {
			const modalToggle = this.state.showModal ? { right: "0em" } : { right: "-30em"}
			return (
				<div className="Objectives" style={modalToggle}>
					<div className="show">
						<div className="Objectives--toggle" onClick={this.toggleModal}></div>
						<ul>
							<li className="blue">Firebase database permissions for users.</li>
							<li>Small load component for uploading and editing entries.</li>
							<li>Can't edit the pictures!</li>
							<li>Reload entries after delete.</li>
							<li>After logout redirect to splash page.</li>
							<li>Splash page for unregistered users. Make it shiny!</li>
							<li>Stay logged after refresh.</li>
							<li>Loading screen is a must.</li>
						</ul>
					</div>
				</div>
			);
		}
};

export default Objectives;