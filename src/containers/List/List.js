import React, { Component } from 'react';
import Noresult from '../../components/Noresult/Noresult';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions';
import Entry from '../../components/Entry/Entry';
import Auth from '../Auth/Auth';

import './List.css';

class List extends Component {

  state = {
    toggleAuth: false,
    samplesFetched: false
  }

	componentDidMount () {
    if (this.props.isSignedIn) {
      this.props.onFetchSamples(this.props.token);
    }
	}

  fetchSamples () {
    if(!this.state.samplesFetched) {
      this.props.onFetchSamples(this.props.token);
      this.setState((prevState, props) => {
        return {
          samplesFetched: !prevState.samplesFetched
        }
      });
    }
    console.log('fetching samples...');
  }

  authHandler = () => {
     this.setState((prevState, props) => {
       return {
         toggleAuth: !prevState.toggleAuth
       }
     });
  }

  logOutHandler = () => {
    this.props.onLogOut();
    this.props.history.push(`/`);
    this.setState({toggleAuth: false});
    this.props.onFetchSamples(this.props.token);
  }

  render() {

    let logged = null;

    if (this.props.token) {
      logged = true;
    } else {
      logged = false;
    }
  	
    let entries;

    if (this.props.isSignedIn) {
        entries = this.props.error ? <Noresult signed={this.props.isSignedIn} /> : <Loader />;
    } else {
        entries = <Noresult signed={this.props.isSignedIn} />;
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

    let signMsg = logged ? "log out" : "log in";
    let logPage = this.state.toggleAuth ? <Auth isOpened={this.state.toggleAuth} /> : null;
    let authMethod = this.props.isSignedIn ? this.logOutHandler : this.authHandler;
    let listStartStyle = ["List__Start", "disableStart"].join(' ');

    if (this.props.isSignedIn) {
      logPage = null;
      this.fetchSamples();
      listStartStyle = ["List__Start"].join(' ');
    }

    return (
      <div className="List">

          <div className="Login" onClick={authMethod}>
            <h2>{signMsg}</h2>
          </div>

          {logPage}

      	  <div className={listStartStyle}>
      	  	 <Link to={'/newEntry'}><button className="Start--Buton" type="submit"></button></Link>
      	  </div>
          <div className="List__Entries" style={listStyle}>
            { entries }
          </div>
          <p className="copy">Made with love by Doria, Ior and Adam - &copy; 2019</p>
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
    onFetchSamples: (token) => dispatch(actionCreators.fetchSamples(token)),
    onLogOut: () => dispatch(actionCreators.logout())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));