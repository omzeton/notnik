import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import './NoteHead.css';

class NoteHead extends Component {

	state = {
		selectedFile: null,
		selectedFileName: '',
	}

	imgHandler = (e) => {
		this.setState({selectedFile: e.target.files[0], selectedFileName: e.target.files[0].name});

		console.log(e.target.files[0].name);
	}

	render() {

	return (
	  <div className="NoteHead" style={{backgroundImage: 'url(' + this.props.img + ')'}}>
	  	<div className="NoteHead__Info">
	  		<h2>{this.props.header}</h2>
	  		<div className="Date__Container">
	  			<ContentEditable className="Date" html={this.props.year}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" html={this.props.month}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" html={this.props.day}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" html={this.props.hour}></ContentEditable>
	  		</div>
	  		<p className="Id"><span>#</span> {this.props.id}</p>
			<input type="file" style={{display: 'none'}} ref={(input) => {this.image = input}} onChange={this.imgHandler}/>
			<button className="NoteHead__Info--BgimgBtn" onClick={() => this.image.click()}></button>
	  	</div>
	  </div>
	);
	}
}

export default NoteHead;