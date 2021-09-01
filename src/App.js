import React, { useContext, } from "react";
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
import { AuthContext } from "./AuthProvider";

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



export default App;