import React from 'react';
import Menu from '../../components/Menu/Menu';
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import Objectives from '../../components/Objectives/Objectives';
import List from '../List/List';
import FullEntry from '../../components/FullEntry/FullEntry';
import Splash from '../../components/Splash/Splash';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';

import './Notnik.css';

const notnik = props => {

    let routes;

    if (props.isAuthenticated) {
      routes = (
        <Route render={({location}) => (
            <Switch location={location}>
                 <Route path="/" exact component={List}></Route>
                 <Route path="/newEntry" exact component={NoteBuilder}></Route>
                 <Route path="/entry/:id" component={FullEntry}></Route>
                 <Route render={() => <Redirect to="/" />}/>
            </Switch>
        )} />
      );
    } else if (!props.isAuthenticated) {
      routes = (
        <Route render={({location}) => (
              <Switch location={location}>
              <Route path="/" exact component={Splash}></Route>
              <Redirect to="/" />
        </Switch>
        )} />
            
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token
    };
};

export default connect(mapStateToProps, null)(notnik);