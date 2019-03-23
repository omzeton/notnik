import React, { Component } from 'react';
import NoteHead from '../MainBody/NoteHead/NoteHead';
import NoteBody from '../MainBody/NoteBody/NoteBody';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './FullEntry.css';

class FullEntry extends Component {

	componentDidMount () {
		this.props.onFetchSamples();
	}
	render() {
			let result = null;

			if ( this.props.import ) {
				const object = this.props.import;

				let arr = Object.keys(object).map(function(key) {
				    return object[key];
				});
				if (arr.id === this.props.match.params.id) {

				}
				console.log(arr);
				console.log(this.props.match.params.id);

				result = arr.map(entry => {
					// eslint-disable-next-line
					if ( entry.id == this.props.match.params.id) {
						return (<div key={entry.id}>
							<NoteHead 
								header={entry.header}
								year={entry.year}
								month={entry.month}
								day={entry.day}
								hour={entry.hour}
								id={entry.id}
								img={entry.img} />
							<NoteBody text={entry.text} />
								</div>
						)
					}
					return result;
				});
			}

		return (
			<div className="FullEntry">
				{result}
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
      import: state.import
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSamples: () => dispatch(actionCreators.fetchSamples())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullEntry));