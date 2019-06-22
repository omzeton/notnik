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
    userSettings: {
      fontSize: null,
      menuPosition: "left"
    },
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
    const userSettings = localStorage.getItem("userSettings");
    const parsedSettings = JSON.parse(userSettings);
    if (!token || !expiryDate || !userSettings) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      userSettings: {
        fontSize: parsedSettings.fontSize,
        menuPosition: parsedSettings.menuPosition
      }
    });
    this.setAutoLogout(remainingMilliseconds);
  }

  /* LOGIN */

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("https://notnik-api.herokuapp.com/auth/login", {
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
          userId: resData.userId,
          userSettings: {
            fontSize: resData.userSettings.fontSize,
            menuPosition: resData.userSettings.menuPosition
          }
        });
        const userSettings = {
          fontSize: resData.userSettings.fontSize,
          menuPosition: resData.userSettings.menuPosition
        };
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
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

  /* LOGOUT */

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = event => {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      isAuth: false,
      token: null,
      userId: null,
      error: null,
      userSettings: {
        fontSize: null,
        menuPosition: "left"
      }
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("userSettings");
  };

  /* DELETE ACCOUNT */

  deleteAccount = () => {
    let error;
    this.setState({ authLoading: true });
    fetch("https://notnik-api.herokuapp.com/auth/terminate", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.state.token
      },
      body: JSON.stringify({
        userId: this.state.userId
      })
    })
      .then(res => {
        console.log(res);
        if (res.status === 422) {
          error = true;
        }
        if ((res.status !== 200) & (res.status !== 201)) {
          error = true;
        }
        return res.json();
      })
      .then(resData => {
        if (error) {
          this.setState({
            authLoading: false,
            error: resData.message
          });
        } else {
          this.setState({
            isAuth: false,
            token: null,
            userId: null,
            authLoading: false,
            error: false
          });
          localStorage.removeItem("token");
          localStorage.removeItem("expiryDate");
          localStorage.removeItem("userId");
          this.props.history.replace("/");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          authLoading: false,
          error: err
        });
      });
  };

  /* SIGNUP */

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    let error = false;
    fetch("https://notnik-api.herokuapp.com/auth/signup", {
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
          error = true;
        }
        if ((res.status !== 200) & (res.status !== 201)) {
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
        } else {
          this.setState({
            isAuth: true,
            authLoading: false,
            userId: resData.userId,
            token: resData.token
          });
          const userSettings = {
            fontSize: resData.userSettings.fontSize,
            menuPosition: resData.userSettings.menuPosition
          };
          localStorage.setItem("token", resData.token);
          localStorage.setItem("userId", resData.userId);
          localStorage.setItem("userSettings", JSON.stringify(userSettings));
          const remainingMilliseconds = 24 * 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          this.setAutoLogout(remainingMilliseconds);
          this.props.history.replace("/");
        }
        console.log(resData);
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
      fetchData.url = "https://notnik-api.herokuapp.com/journal/entry";
      fetchData.payLoad = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        },
        body: fd
      };
    } else {
      fetchData.url = `https://notnik-api.herokuapp.com/journal${location}`;
      fetchData.payLoad = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        },
        body: fd
      };
    }
    fetch(fetchData.url, fetchData.payLoad)
      .then(res => {
        console.log(res);
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

  /* FONT SIZE */

  fontSizeHandler = data => {
    const userId = this.state.userId;
    fetch("https://notnik-api.herokuapp.com/journal/font-size", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        newFontSize: data
      })
    })
      .then(res => {
        console.log(res);
        if ((res.status !== 200) & (res.status !== 201)) {
          throw new Error("Error when setting new font size!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          userSettings: {
            ...this.state.userSettings,
            fontSize: data
          }
        });
        const storage = JSON.parse(localStorage.getItem("userSettings"));
        storage.fontSize = data;
        localStorage.setItem("userSettings", JSON.stringify(storage));
      })
      .catch(err => {
        console.log(err);
      });
  };

  /* MENU BAR POSITON */

  menuHandler = data => {
    this.setState({
      userSettings: { ...this.state.userSettings, menuPosition: data }
    });
    const userId = this.state.userId;
    fetch("https://notnik-api.herokuapp.com/journal/menu-position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        newMenuPosition: data
      })
    })
      .then(res => {
        console.log(res);
        if ((res.status !== 200) & (res.status !== 201)) {
          throw new Error("Error when setting new font size!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState({
          userSettings: {
            ...this.state.userSettings,
            menuPosition: data
          }
        });
        const storage = JSON.parse(localStorage.getItem("userSettings"));
        storage.menuPosition = data;
        localStorage.setItem("userSettings", JSON.stringify(storage));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    window.addEventListener("keydown", e => {
      let location = this.props.location.pathname;
      if (e.Handled) return;
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        if (location !== "/" && location !== "/settings") {
          this.createNewEntry();
        }
      }
      e.Handled = true;
    });
    let deleteAccountProps = {
      function: this.deleteAccount,
      error: this.state.errors,
      authLoading: this.state.authLoading
    };
    let scroll = this.state.isAuth
      ? { overflow: "hidden" }
      : { overflowY: "scroll" };
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
                  fontSize={this.state.userSettings.fontSize}
                />
              )}
            />
            <Route
              path="/entry/:id"
              render={() => (
                <FullEntry
                  loc={location}
                  onRegisterChange={this.registerChange}
                  fontSize={this.state.userSettings.fontSize}
                />
              )}
            />
            <Route
              path="/settings"
              render={() => (
                <Settings
                  defaultFontSize={this.state.userSettings.fontSize}
                  onSetFontSize={this.fontSizeHandler}
                  onMenuPosition={this.menuHandler}
                  defaultMenuPosition={this.state.userSettings.menuPosition}
                  deletion={deleteAccountProps}
                  onLogout={this.logoutHandler}
                  userId={this.state.userId}
                />
              )}
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
    let menuPosition;
    const notnik = document.querySelector(".Notnik");
    let menuFirstChild, menuSecondChild;
    if (notnik !== null) {
      menuFirstChild = notnik.firstChild;
      menuSecondChild = notnik.firstChild.nextSibling;
      switch (this.state.userSettings.menuPosition) {
        case "left":
          menuPosition = {
            gridTemplateRows: "1fr",
            gridTemplateColumns: "3em 1fr"
          };
          menuFirstChild.style.gridColumn = "1";
          menuFirstChild.style.gridRow = "1";

          menuSecondChild.style.gridColumn = "2";
          menuSecondChild.style.gridRow = "1";
          break;
        case "top":
          menuPosition = {
            gridTemplateRows: "3em 1fr",
            gridTemplateColumns: "1fr"
          };
          menuFirstChild.style.gridColumn = "1";
          menuFirstChild.style.gridRow = "1";

          menuSecondChild.style.gridColumn = "1";
          menuSecondChild.style.gridRow = "2";
          break;
        case "right":
          menuPosition = {
            gridTemplateRows: "1fr",
            gridTemplateColumns: "1fr 3em"
          };
          menuFirstChild.style.gridColumn = "2";
          menuFirstChild.style.gridRow = "1";

          menuSecondChild.style.gridColumn = "1";
          menuSecondChild.style.gridRow = "1";
          break;
        case "bottom":
          menuPosition = {
            gridTemplateRows: "1fr 3em",
            gridTemplateColumns: "1fr"
          };
          menuFirstChild.style.gridRow = "2";
          menuFirstChild.style.gridColumn = "1";

          menuSecondChild.style.gridRow = "1";
          menuSecondChild.style.gridColumn = "1";
          break;
        default:
          break;
      }
    }
    return (
      <div className={"Notnik"} style={{ ...menuPosition }}>
        <Menu
          createNewEntry={this.createNewEntry}
          isAuth={this.state.isAuth}
          menuPosition={this.state.userSettings.menuPosition}
        />
        <div className="Content" style={scroll}>
          {routes}
        </div>
      </div>
    );
  }
}

export default withRouter(Notnik);
