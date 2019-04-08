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
							<li>Firebase permission denied when making new entry.</li>
							<li>Restructure user data -> notnik-app : notes : $uId : their note data.</li>
							<li>On log out return to main page</li>
							<li>Weird divs and markup in small Entry's text</li>
							<li>Cannot edit the pictures!</li>
							<li>Registration and login system</li>
							<li>Delete entries</li>
							<li>Home page for unregistered users. Make it shiny!</li>
							<li>Why is it fetching samples 4 times in List ?</li>
						</ul>
					</div>
				</div>
			);
		}

};

export default Objectives;