import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import List from '../List/List';
import FullEntry from '../../components/FullEntry/FullEntry';

import { Route, Switch, Redirect } from 'react-router-dom';

import './Notnik.css';

class Notnik extends Component {
  render() {
    return (
      <div className="Notnik">
          <Menu/>
          <Switch>
          	 <Route path="/" exact component={List}></Route>
          	 <Route path="/newEntry" exact component={NoteBuilder}></Route>
             <Route path="/entry/:id" component={FullEntry}></Route>
             <Route render={() => <Redirect to="/" />}/>
          </Switch>
      </div>
    );
  }
}

export default Notnik;