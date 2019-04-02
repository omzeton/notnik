import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import './NoteHead.css';

class NoteHead extends Component {

	state = {
		header: this.props.header,
		year: this.props.year,
		month: this.props.month,
		day: this.props.day,
		hour: this.props.hour,
		img: this.props.img,
		fKey: this.props.firebaseKey,
		previewImg: this.props.img
	}


	handleYearChange = evt => {
	    this.setState({ year: evt.target.value });
	    this.props.onGetNewYear(evt.target.value);
	}

	handleMonthChange = evt => {
	    this.setState({ month: evt.target.value });
	    this.props.onGetNewMonth(evt.target.value);
	}

	handleDayChange = evt => {
	    this.setState({ day: evt.target.value });
	    this.props.onGetNewDay(evt.target.value);
	}

	handleHourChange = evt => {
	    this.setState({ hour: evt.target.value });
	    this.props.onGetNewHour(evt.target.value);
	}

	handleHeaderChange = evt => {
		this.setState({ header: evt.target.value });
		this.props.onGetNewHeader(evt.target.value);
	}

	imgHandler = (e) => {
		const files = e.target.files[0];
		this.setState({ img: files });
		
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => {
			this.setState({ previewImg: fileReader.result });
		});
		fileReader.readAsDataURL(files);
		this.props.onGetImg(files);
	}

	initExport = () => {
		this.props.onGetNewYear(this.state.year);
		this.props.onGetNewMonth(this.state.month);
		this.props.onGetNewDay(this.state.day);
		this.props.onGetNewHour(this.state.hour);
		this.props.onGetNewHeader(this.state.header);
		this.props.onGetImg(this.state.img);
		this.props.onSetFKey(this.state.fKey);
	}

	render() {

		// It's not good that it renders like that every time :(
		this.initExport();

	return (
	  <div className="NoteHead" style={{backgroundImage: 'url(' + this.state.previewImg + ')'}}>
	  	<div className="NoteHead__Info">
	  		<ContentEditable className="Header" onChange={this.handleHeaderChange} html={this.state.header}></ContentEditable>
	  		<div className="Date__Container">
	  			<ContentEditable className="Date" onChange={this.handleYearChange} html={this.state.year}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" onChange={this.handleMonthChange} html={this.state.month}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" onChange={this.handleDayChange} html={this.state.day}></ContentEditable> <div className="Separation">-</div> <ContentEditable className="Date" onChange={this.handleHourChange} html={this.state.hour}></ContentEditable>
	  		</div>
	  		<p className="Id"><span>#</span> {this.props.id}</p>
			<input type="file" style={{display: 'none'}} ref={(input) => {this.image = input}} onChange={this.imgHandler}/>
			<button className="NoteHead__Info--BgimgBtn" onClick={() => this.image.click()}></button>
	  	</div>
	  </div>
	);
	}
}
const mapDispatchToProps = dispatch => {
  return {
    onGetNewYear: (cargo) => dispatch(actionCreators.getNewYear(cargo)),
    onGetNewMonth: (cargo) => dispatch(actionCreators.getNewMonth(cargo)),
    onGetNewDay: (cargo) => dispatch(actionCreators.getNewDay(cargo)),
    onGetNewHour: (cargo) => dispatch(actionCreators.getNewHour(cargo)),
    onGetNewHeader: (cargo) => dispatch(actionCreators.getNewHeader(cargo)),
    onGetImg: (cargo) => dispatch(actionCreators.getImg(cargo)),
    onSetFKey: (cargo) => dispatch(actionCreators.getfKey(cargo))
	}
};

export default connect(null, mapDispatchToProps)(NoteHead);