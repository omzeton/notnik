import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import List from '../List/List';

import { Route, withRouter, Switch } from 'react-router-dom';

import './Notnik.css';

class Notnik extends Component {
  render() {
    return (
      <div className="Notnik">
          <Menu/>
          <Switch>
          	 <Route path="/" exact component={List}></Route>
          	 <Route path="/entry" exact component={NoteBuilder}></Route>
          </Switch>
      </div>
    );
  }
}

export default withRouter(Notnik);