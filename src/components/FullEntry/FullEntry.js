import React, { useEffect } from 'react';
import NoteHead from '../MainBody/NoteHead/NoteHead';
import NoteBody from '../MainBody/NoteBody/NoteBody';
import Noresult from '../Noresult/Noresult';
import Loader from '../Loader/Loader';
import * as actionCreators from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './FullEntry.css';

const fullEntry = props => {

	useEffect(() => {
		let id = props.match.params.id;
		props.onFetchSamples(props.token);
		props.onSetIndex(id);
	}, []);

	let result = props.error ? <Noresult /> : <Loader />;

	if (props.import) {

		let imported = props.import.users;

		for (let user in imported) {
			if (user === props.userId) {
				imported = imported[user];
			}
		}

		imported = Object.keys(imported).map(function (key) {
			return imported[key];
		});
		// eslint-disable-next-line
		result = imported.map(entry => {
			// eslint-disable-next-line
			if (entry.id == props.match.params.id) {
				return <div key={entry.id}>
							<NoteHead
								header={entry.header}
								year={entry.year}
								month={entry.month}
								day={entry.day}
								hour={entry.hour}
								id={entry.id}
								firebaseKey={entry.fKey}
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
};

const mapStateToProps = state => {
	return {
		import: state.import,
		error: state.error,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchSamples: (token) => dispatch(actionCreators.fetchSamples(token)),
		onSetIndex: (index) => dispatch(actionCreators.setIndex(index))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(fullEntry));