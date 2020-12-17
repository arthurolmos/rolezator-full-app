import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { ReactElement } from "react";
import Login from "./screens//Login";
import Panel from "./screens/Panel";
import { AuthContext } from "./contexts/AuthContext";
import ManageSuggestions from "./screens/ManageSuggestions";
import CreateSuggestion from "./screens/CreateSuggestion";
import EditSuggestion from "./screens/EditSuggestion";
import ViewSuggestion from "./screens/ViewSuggestion";

function PrivateRoute({
  children,
  ...rest
}: {
  children?: ReactElement;
  path?: string;
  component?: any;
  exact?: boolean;
}) {
  const { admin } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/panel">
          <Panel />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions">
          <ManageSuggestions />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/create">
          <CreateSuggestion />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/edit/:_id">
          <EditSuggestion />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/view/:_id">
          <ViewSuggestion />
        </PrivateRoute>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}
