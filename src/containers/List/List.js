import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions';
import Auth from '../Auth/Auth';
import Fetched from '../../components/Fetched/Fetched';

import './List.css';

class List extends Component {

  state = {
    toggleAuth: false
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
  }

  render() {

    let logged = null;

    if (this.props.isSignedIn) {
      logged = true;
    } else {
      logged = false;
    }

    let signMsg = logged ? "log out" : "log in";
    let logPage = this.state.toggleAuth ? <Auth isOpened={this.state.toggleAuth} /> : null;
    let authMethod = this.props.isSignedIn ? this.logOutHandler : this.authHandler;
    let listStartStyle = ["List__Start", "disableStart"].join(' ');

    if (this.props.isSignedIn) {
      logPage = null;
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
           
          <Fetched />

          <p className="copy">Made with love by Doria, Ior and Adam - &copy; 2019</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actionCreators.logout())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));