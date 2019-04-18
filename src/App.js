import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Notnik from './containers/Notnik/Notnik';

// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions';

// Firebase
import firebase from '@firebase/app';
// eslint-disable-next-line
import { auth } from '@firebase/auth';

import './App.css';

const config = {
	apiKey: "AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A",
	    authDomain: "notnik-app.firebaseapp.com",
	    databaseURL: "https://notnik-app.firebaseio.com",
	    projectId: "notnik-app",
	    storageBucket: "notnik-app.appspot.com",
	    messagingSenderId: "813392804298"
	  };
firebase.initializeApp(config);

class App extends Component {

  state = {
  	loading: true,
    authenticated: false,
  }

  // componentDidMount() {
  //     firebase.auth().onAuthStateChanged((user) => {
  //       if (user) {
  //         this.setState({ loading: false, authenticated: true });
  //         this.props.onAuth('brambor@gmail.com', 'brambor', true);
  //       } else {
  //         this.setState({ loading: false, authenticated: false });
  //       }
  //     });
  //   }

  render() {

    return (
      <div className="App">
          <BrowserRouter>
              <Notnik />
          </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, logReg ) => dispatch(actions.auth(email, password, logReg))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(App);