import React, { Component } from 'react';
import Noresult from '../../components/Noresult/Noresult';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import Entry from '../../components/Entry/Entry';
import Auth from '../Auth/Auth';

import './List.css';

class List extends Component {

  state = {
    logged: false,
    toggleAuth: true
  }

	componentDidMount () {
		this.props.onFetchSamples();
	}

  authHandler = () => {
     this.setState((prevState, props) => {
       return {
         toggleAuth: !prevState.toggleAuth
       }
     });
  }

  render() {

  	let entries = this.props.error ? <Noresult /> : <Loader />;

    	if ( this.props.import ) {
    		const object = this.props.import;

    		let arr = Object.keys(object).map(function(key) {
    		    return object[key];
    		});

    		entries = arr.map(result => {

          if (entries.length > 4) {
            return (<Link to={'/entry/' + result.id} key={result.id}><Entry 
            header={result.header}
            year={result.year}
            month={result.month} 
            day={result.day}
            text={result.textBody}
            img={result.img}/></Link>);
          } else {
            return (<Link to={'/entry/' + result.id} key={result.id}><Entry 
            header={result.header}
            year={result.year} 
            month={result.month} 
            day={result.day}
            text={result.textBody}
            img={result.img}/></Link>);
          }

    			
    		});



    	}

    // Column display 5
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

    let signMsg = this.state.logged ? "log out" : "log in";
    let logPage = this.state.toggleAuth ? <Auth /> : null;

    return (
      <div className="List">

          <div className="Login" onClick={this.authHandler}>
            <h2>{signMsg}</h2>
          </div>

          {logPage}

      	  <div className="List__Start">
      	  	 <Link to={'/newEntry'}><button className="Start--Buton" type="submit"></button></Link>
      	  </div>
          <div className="List__Entries" style={listStyle}>
            { entries }
          </div>
          <p className="copy">Made with &#10084; by Doria, Ior and Adam - &copy; 2019</p>
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