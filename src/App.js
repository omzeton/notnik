import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Notnik from './containers/Notnik/Notnik';
// Firebase
import firebase from '@firebase/app';

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

const app = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Notnik />
        </BrowserRouter>
      </div>
    );
}

export default app;