import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import Objectives from '../../components/Objectives/Objectives';
import List from '../List/List';
import FullEntry from '../../components/FullEntry/FullEntry';
import Splash from '../../components/Splash/Splash';
import { connect } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Route, Switch, Redirect } from 'react-router-dom';

import './Notnik.css';

class Notnik extends Component {
  render() {

    let routes;

    if (this.props.isAuthenticated) {
      routes = (
        <Route render={({location}) => (
            <TransitionGroup className="TransitionGroup">
            <CSSTransition key={location.key} timeout={500} classNames="fade">
            <Switch location={location}>
                 <Route path="/" exact component={List}></Route>
                 <Route path="/newEntry" exact component={NoteBuilder}></Route>
                 <Route path="/entry/:id" component={FullEntry}></Route>
                 <Route render={() => <Redirect to="/" />}/>
            </Switch>
            </CSSTransition>
            </TransitionGroup>
        )} />
        
      );
    } else if (!this.props.isAuthenticated) {
      routes = (
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={500} classNames="fade">
              <Switch location={location}>
              <Route path="/" exact component={Splash}></Route>
              <Redirect to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
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
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token
    };
};

export default connect(mapStateToProps, null)(Notnik);