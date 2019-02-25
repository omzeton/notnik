import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import MainWritingArea from './containers/MainWritingArea/MainWritingArea';
import './App.css';

class App extends Component {
  state = {
  }

  render() {

    return (
      <div className="App">
          <Menu/>
          <MainWritingArea />
      </div>
    );
  }
}

export default App;

/*

1. Input title
2. Input date
3. Input text
4. SAVE IT ALL (to a database/firebird)
5. go to menu
6. choose saved entry
7. edit it

8. save all entries and display them next to each other
*/