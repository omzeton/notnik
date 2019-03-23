import React, { Component } from 'react';
import NoteHead from '../MainBody/NoteHead/NoteHead';
import NoteBody from '../MainBody/NoteBody/NoteBody';
import Noresult from '../Noresult/Noresult';
import Loader from '../Loader/Loader';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './FullEntry.css';

class FullEntry extends Component {

	state = {
		error: this.props.error
	}

	componentDidMount () {
		this.props.onFetchSamples();
	}
	render() {

			let result = this.state.error ? <Noresult /> : <Loader />;

			if ( this.props.import ) {
				const object = this.props.import;

				let arr = Object.keys(object).map(function(key) {
				    return object[key];
				});
				// eslint-disable-next-line
				result = arr.map(entry => {
					// eslint-disable-next-line
					if ( entry.id == this.props.match.params.id) {
						return <div key={entry.id}>
									<NoteHead 
										header={entry.header}
										year={entry.year}
										month={entry.month}
										day={entry.day}
										hour={entry.hour}
										id={entry.id}
										img={entry.img} />
									<NoteBody text={entry.textBody} />
								</div>
					}
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
      import: state.import,
      error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchSamples: () => dispatch(actionCreators.fetchSamples())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullEntry));