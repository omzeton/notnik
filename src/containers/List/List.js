import React, { Component } from 'react';
import Noresult from '../../components/Noresult/Noresult';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Entry from '../../components/Entry/Entry';

import './List.css';

class List extends Component {

	componentDidMount () {
		this.props.onFetchSamples();
	}

  render() {

  	let entries = this.props.error ? <Noresult /> : <Loader />;

  	if ( this.props.import ) {
  		const object = this.props.import;

  		let arr = Object.keys(object).map(function(key) {
  		    return object[key];
  		});

  		entries = arr.map(result => {
  			return (<Link to={'/entry/' + result.id} key={result.id}><Entry 
  				header={result.header} 
  				year={result.year} 
  				month={result.month} 
  				day={result.day}
  				text={result.textBody}
  				img={result.img}/></Link>);
  		});
  	}

    return (
      <div className="List">
      	  <div className="List__Start">
      	  	 <Link to={'/newEntry'}><button className="Start--Buton" type="submit"></button></Link>
      	  </div>
          { entries }
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


export default connect(mapStateToProps, mapDispatchToProps)(List);