import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import Objectives from '../../components/Objectives/Objectives';
import List from '../List/List';
import FullEntry from '../../components/FullEntry/FullEntry';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import './Notnik.css';

class Notnik extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={List}></Route>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
             <Route path="/" exact component={List}></Route>
             <Route path="/newEntry" exact component={NoteBuilder}></Route>
             <Route path="/entry/:id" component={FullEntry}></Route>
             <Route render={() => <Redirect to="/" />}/>
        </Switch>
      );
    }

    return (
      <div className="Notnik">
          <Menu/>
            {routes}
          <Objectives />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps, null)(Notnik);