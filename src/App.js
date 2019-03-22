import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Notnik from './containers/Notnik/Notnik';

import './App.css';

class App extends Component {
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

export default App;