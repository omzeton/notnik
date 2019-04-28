import React, { useState } from 'react';
import Entry from '../Entry/Entry';
import Noresult from '../Noresult/Noresult';
import Loader from '../Loader/Loader';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Fetched.css';

const fetched = props => {

	const [fetchStatus, setFetchStatus] = useState(false);

	const onFetch = () => {
		if (!fetchStatus) {
			setFetchStatus(true);
			props.onFetchSamples(props.token);
			console.log('fetching entries...');
		}
	};

	let entries,
		signStatus = props.isSignedIn,
		key,
		arr,
		columns,
		str;

	if (signStatus) {
		onFetch();
		entries = props.error ? <Noresult signed={props.isSignedIn} /> : <Loader />;
	} else {
		entries = <Noresult signed={props.signedIn} />;
	};

	if (props.import && signStatus) {

		const object = props.import.users;
		key = props.userId;

		for (let user in object) {
			if (user === key) {
				arr = object[user];
			}
		}

		arr = Object.keys(arr).map(function (key) {
			return arr[key];
		});

		// eslint-disable-next-line
		entries = arr.map(result => {
			// eslint-disable-next-line
			if (result.userId == props.userId) {
				return (
					<Entry
						id={result.id}
						key={result.fKey}
						header={result.header}
						year={result.year}
						fKey={result.fKey}
						uid={result.userId}
						month={result.month}
						day={result.day}
						text={result.textBody}
						img={result.img} />
				);
			};
		});
	};


	// Splitting entries into columns
	str = entries.length / 4;
	str = str.toString();

	if (str.length > 1) {
		columns = parseInt(str[0], 10);
		columns++;
	} else {
		columns = parseInt(str[0], 10);
	};

	const listStyle = {
		gridTemplateColumns: `repeat(${columns}, 30em)`
	};

	return (
		<div className="Fetched" style={listStyle}>
			{entries}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		import: state.import,
		error: state.error,
		token: state.auth.token,
		isSignedIn: state.auth.isSignedIn,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onFetchSamples: (token) => dispatch(actionCreators.fetchSamples(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(fetched);