import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import './NoteHead.css';

class NoteHead extends Component {

	state = {
		selectedFile: null,
		selectedFileName: '',
		title: this.props.header,
		year: this.props.year,
		month: this.props.month,
		day: this.props.day,
		hour: this.props.hour
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

	handleTitleChange = evt => {
		this.setState({ title: evt.target.value });
		this.props.onGetNewTitle(evt.target.value);
	}

	imgHandler = (e) => {
		this.setState({selectedFile: e.target.files[0], selectedFileName: e.target.files[0].name});

		console.log(e.target.files[0].name);
	}

	render() {

	return (
	  <div className="NoteHead" style={{backgroundImage: 'url(' + this.props.img + ')'}}>
	  	<div className="NoteHead__Info">
	  		<ContentEditable className="Title" onChange={this.handleTitleChange} html={this.state.title}></ContentEditable>
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
    onGetNewTitle: (cargo) => dispatch(actionCreators.getNewTitle(cargo))
	}
};

export default connect(null, mapDispatchToProps)(NoteHead);