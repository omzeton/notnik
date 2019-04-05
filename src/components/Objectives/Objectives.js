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
							<li>Weird divs and markup in small Entry's text</li>
							<li>Cannot edit the pictures!</li>
							<li>Registration and login system</li>
							<li>Nicer error messages when loging in nad signing up - switch statement for error messages</li>
							<li>Delete entries</li>
							<li>Settings button:</li>
							<ol>
								<li>5 background patterns to choose from</li>
								<li>3 Font pairs</li>
								<li>3 font sizes</li>
							</ol>
						</ul>
					</div>
				</div>
			);
		}

};

export default Objectives;