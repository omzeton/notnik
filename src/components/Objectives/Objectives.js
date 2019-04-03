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
							<li>Delete entries</li>
							<li>Show some sort of notifier after save has been completed</li>
						</ul>
					</div>
				</div>
			);
		}

};

export default Objectives;