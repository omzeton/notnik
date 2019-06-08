import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import HomeScreen from "../Main/HomeScreen/HomeScreen";
import NoteCreator from "../Main/NoteCreator/NoteCreator";
import FullEntry from "../Main/FullEntry/FullEntry";
import Settings from "../Main/Settings/Settings";
import Menu from "../Menu/Menu";
import Splash from "../Main/Splash/Splash";

import "./Notnik.css";

class Notnik extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    newEntry: {
      title: null,
      body: null,
      year: null,
      month: null,
      day: null,
      time: null,
      imgUrl: null,
      id: null,
      uId: null
    },
    newId: null,
    updateLoading: false
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  /* LOGIN */

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.email.value,
        password: authData.password.value
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation error.");
        }
        if ((res.status !== 200) & (res.status !== 201)) {
          console.log("Error when logging in!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000; // sets the max session
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = event => {
    if (event) {
      event.preventDefault();
    }
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  /* SIGNUP */

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    let error = false;
    console.log(authData.repeatPassword.value);
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: authData.email.value,
        password: authData.password.value,
        repeatPassword: authData.repeatPassword.value
      })
    })
      .then(res => {
        console.log(res);
        if (res.status === 422) {
          // throw new Error(`Validation failed. Make sure the email address isn't used yet!`);
          error = true;
        }
        if ((res.status !== 200) & (res.status !== 201)) {
          // throw new Error("Creating a user failed!");
          error = true;
        }
        return res.json();
      })
      .then(resData => {
        if (error) {
          this.setState({
            isAuth: false,
            authLoading: false,
            error: resData.message
          });
        }
        console.log(resData);
        this.setState({ isAuth: true, authLoading: false });
        this.props.history.replace("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  /* ERRORS */

  errorHandler = () => {
    this.setState({ error: null });
  };

  /* CREATING + UPDATING ENTRY */

  createNewEntry = () => {
    let location = this.props.location.pathname;
    let date =
      this.state.newEntry.year +
      "-" +
      this.state.newEntry.month +
      "-" +
      this.state.newEntry.day +
      "- " +
      this.state.newEntry.time;
    this.setState({ updateLoading: true });
    let fd = new FormData();
    fd.append("title", this.state.newEntry.title);
    fd.append("body", this.state.newEntry.body);
    fd.append("date", date);
    fd.append("imgUrl", this.state.newEntry.imgUrl);
    fd.append("uId", this.state.newEntry.uId);
    let fetchData = { url: "", payLoad: {} };
    if (location === "/create-new-entry") {
      fetchData.url = "http://localhost:8080/journal/entry";
      fetchData.payLoad = {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: fd
      };
    } else {
      fetchData.url = `http://localhost:8080/journal${location}`;
      fetchData.payLoad = {
        method: "PUT",
        headers: {
          Accept: "application/json"
        },
        body: fd
      };
    }
    fetch(fetchData.url, fetchData.payLoad)
      .then(res => {
        if (res.status === 422) {
          throw new Error("Could not process a new entry!");
        }
        if ((res.status !== 200) & (res.status !== 201)) {
          throw new Error("Could not process a new entry!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({ updateLoading: false });
        if (location === "/create-new-entry") {
          return this.props.history.push(`/entry/${resData.entry._id}`);
        }
        return;
      })
      .catch(err => {
        console.log(err);
        this.setState({
          updateLoading: false,
          error: err
        });
      });
  };

  registerChange = data => {
    this.setState({
      newEntry: {
        ...data.newEntry,
        uId: this.state.userId
      }
    });
  };

  render() {
    window.addEventListener("keydown", e => {
      let location = this.props.location.pathname;
      if (e.Handled) return;
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        if(location !== '/' && location !== '/settings') {
          this.createNewEntry();
        }
      }
      e.Handled = true;
    });
    let routes = this.state.isAuth ? (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route
              path="/"
              exact
              render={() => <HomeScreen currentUser={this.state.userId} />}
            />
            <Route
              path="/create-new-entry"
              render={() => (
                <NoteCreator
                  loc={location}
                  onRegisterChange={this.registerChange}
                />
              )}
            />
            <Route
              path="/entry/:id"
              render={() => (
                <FullEntry
                  loc={location}
                  onRegisterChange={this.registerChange}
                />
              )}
            />
            <Route
              path="/settings"
              render={() => <Settings onLogout={this.logoutHandler} />}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        )}
      />
    ) : (
      <Route
        render={({ location }) => (
          <Switch location={location}>
            <Route
              path="/"
              exact
              render={() => (
                <Splash
                  error={this.state.error}
                  errorHandler={this.errorHandler}
                  authLoading={this.state.authLoading}
                  onLogin={this.loginHandler}
                  onSignup={this.signupHandler}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        )}
      />
    );
    return (
      <div className="Notnik">
        <Menu createNewEntry={this.createNewEntry} isAuth={this.state.isAuth} />
        {routes}
      </div>
    );
  }
}

export default withRouter(Notnik);
