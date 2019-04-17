import React, { Component } from 'react';
import Entry from '../Entry/Entry';
import Noresult from '../Noresult/Noresult';
import Loader from '../Loader/Loader';
 
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import './Fetched.css';

class Fetched extends Component {

	state = {
		fetchStatus: false
	}

	onFetch = () => {
		if(!this.state.fetchStatus) {
			this.setState({fetchStatus: true});
			this.props.onFetchSamples(this.props.token);
			console.log('fetching entries...');
		}
	}

	onReload = () => {
		if(!this.state.fetchStatus) {
			this.setState({fetchStatus: true});
			this.props.onFetchSamples(this.props.token);
			console.log('reloading...');
		}
	}

	render() {
		let entries;
		let signStatus = this.props.isSignedIn;

		if (signStatus) {
			this.onFetch();
		}

		if (signStatus) {
			entries = this.props.error ? <Noresult signed={this.props.isSignedIn} /> : <Loader />;
		} else {
			entries = <Noresult signed={this.props.signedIn} />;
		}

		if ( this.props.import ) {
			const object = this.props.import;

			let arr = Object.keys(object).map(function(key) {
			    return object[key];
			});
	   		// eslint-disable-next-line
			entries = arr.map(result => {
	        // eslint-disable-next-line
		      if (result.userId == this.props.userId) {
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
		          img={result.img}/>
		          );
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

export default connect(mapStateToProps, mapDispatchToProps)(Fetched);