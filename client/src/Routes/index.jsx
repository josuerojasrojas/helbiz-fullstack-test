import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "components/UserContextProvider";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import Home from "./Home";
import Bike from "./Bike";
import Login from "./Login";
import NoMatch from "./NoMatch";


const Routes = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = !!user;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
        <AuthenticatedRoute redirectTo="/login" isAuthenticated={isAuthenticated}>
          <Home />
          </AuthenticatedRoute>
        </Route>
        <Route exact path="/bike/:id">
        <AuthenticatedRoute redirectTo="/login" isAuthenticated={isAuthenticated}>
          <Bike />
          </AuthenticatedRoute>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
