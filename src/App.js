import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { AuthContext, AuthProvider } from "./AuthProvider";

let App=()=> {
  let { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Switch>
          {currentUser ? (
            <>
              <Navbar />
              <Route path="/" component={Feeds} exact />
              <Route path="/profile" component={Profile} exact />
              <Redirect to="/" />
            </>
          ) : (
            <>
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={Signup} exact />
              <Redirect to="/login" />
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

function PrivateRoute(props) {
  let { comp: Component, path } = props;
  // Feeds ?? loggedIn and path="/"
  let { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  // let currentUser = true;
  return currentUser ? (
    <Route path={path} component={Component}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default App;