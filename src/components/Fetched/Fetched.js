import React, { useState, useEffect } from 'react';
import Entry from '../Entry/Entry';
import Noresult from '../Noresult/Noresult';
import Loader from '../Loader/Loader';
 
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Fetched.css';

const fetched = (props) => {

	const [fetchState, setFetchingState] = useState({ fetchStatus: false });

	useEffect(() => {
		if(!fetchState.fetchStatus) {
			setFetchingState({fetchStatus: true});
			props.onFetchSamples(props.token);
			console.log('fetching entries...');
		}
	});

	const onFetch = () => {
		if(!fetchState.fetchStatus) {
			setFetchingState({fetchStatus: true});
			props.onFetchSamples(props.token);
			console.log('fetching entries...');
		}
	}

	let entries;
	let signStatus = props.isSignedIn;

	if (signStatus) {
		onFetch();
	}

	if (signStatus) {
		entries = props.error ? <Noresult signed={props.isSignedIn} /> : <Loader />;
	} else {
		entries = <Noresult signed={props.signedIn} />;
	}

	if ( props.import ) {
		const object = props.import;

		let arr = Object.keys(object).map(function(key) {
		    return object[key];
		});
   		// eslint-disable-next-line
		entries = arr.map(result => {
        // eslint-disable-next-line
	      if (result.userId == props.userId) {
	          return (<Entry
	          id={result.id}
	          key={result.fKey}
	          header={result.header}
	          year={result.year}
	          fKey={result.fKey}
	          uid={result.userId}
	          month={result.month}
	          day={result.day}
	          text={result.textBody}
	          img={result.img}/>);
	      }    			
		});
	}

	let eAmount = entries.length,
	    columns,
	    str;

	    str = eAmount / 4;
	    str = str.toString();

	    if ( str.length > 1 ) {
	      columns = parseInt(str[0], 10);
	      columns++;
	    } else {
	      columns = parseInt(str[0], 10);
	    }

	let listStyle = {
	  gridTemplateColumns: `repeat(${columns}, 30em)`
	}

	return (
		<div className="Fetched" style={listStyle}>
		  { entries }
		</div>
	);
}

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