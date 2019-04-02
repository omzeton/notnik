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
							<li>Double click on newEntry's save creates entries with new Id</li>
							<li>Display all entries in columns with 4 entries in each one.</li>
							<li>Push edited entry and replace the old one.</li>
							<li>Delete entries</li>
						</ul>
					</div>
				</div>
			);
		}

};

export default Objectives;