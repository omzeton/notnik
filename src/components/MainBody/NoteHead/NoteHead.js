import React, { Component } from 'react';

import './NoteHead.css';

class NoteHead extends Component {

	state = {
		selectedFile: null,
		selectedFileName: '',
	}

	imgHandler = (e) => {
		this.setState({selectedFile: e.target.files[0], selectedFileName: e.target.files[0].name});

		console.log(e.target.files[0].name);

		// const fd = new FormData();
		// fd.append('image', e.target.files[0], e.target.files[0].name);
		// const fileName = e.target.files[0].name;

		// this.setState({loadingFinished: false});

		// axios.post('https://us-central1-real-estate-d9a1e.cloudfunctions.net/uploadFile', fd, {
		// 	onUploadProgress: progressEvent => {
		// 		console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
		// 	}
		// }).then((response) => {console.log(response)}).then(() => {
		// 	firebaseStorage.child(`${fileName}`).getDownloadURL()
		// 		.then((url) => {
		// 				console.log(`Stage 1 : Getting url from the img`);
		// 				this.setState({object: {...this.state.object, "img": url} });
		// 				console.log(`Putting url inside the object`);
		// 				console.log(this.state.object);
		// 				console.log(url);
		// 				this.setState({loadingFinished: true});
		// 			})
		// 		.catch(error => {
		// 			console.log('failed at stage 1');
		// 		})
		// });
	}

	render() {

	return (
	  <div className="NoteHead" style={{backgroundImage: 'url(' + this.props.img + ')'}}>
	  	<div className="NoteHead__Info">
	  		<h2>{this.props.header}</h2>
	  		<p><span>{this.props.year}</span> - <span>{this.props.month}</span> - <span>{this.props.day}</span> - <span>{this.props.hour}</span></p>
	  		<p>{this.props.id}</p>
			<input type="file" style={{display: 'none'}} ref={(input) => {this.image = input}} onChange={this.imgHandler}/>
			<button className="NoteHead__Info--BgimgBtn" onClick={() => this.image.click()}></button>
	  	</div>
	  </div>
	);
	}
}

export default NoteHead;