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
							<li>Fix annoying scrollbars</li>
							<li className="finished">"Error: Reference.update failed: First argument contains undefined in property" problem z pozyskaniem URL z pliku</li>
							<li className="finished">Gdy piszemy nowy wpis nie może pozyskiwać danych z docelowej wartości, czyli z sampla bo jeszcze go nie ma!</li>
							<li>Replace data from entry with the same id when hitting save.</li>
							<li className="finished">Move uploaded images to note-img folder in Firebase.</li>
							<li className="finished">Avoid name duplicates by assigning them id.</li>
						</ul>
					</div>
				</div>
			);
		}

};

export default Objectives;