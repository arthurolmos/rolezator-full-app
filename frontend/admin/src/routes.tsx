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
// import CreateUser from "./screens/CreateUser";
// import ViewUser from "./screens/ViewUser";
import { ManageSuggestions, ManageUsers } from "./screens/manage";
import { CreateSuggestion } from "./screens/create";
import { EditSuggestion, EditUser } from "./screens/edit";
import { ViewSuggestion } from "./screens/view";

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
        <PrivateRoute exact path="/panel/users">
          <ManageUsers />
        </PrivateRoute>
        {/* <PrivateRoute exact path="/panel/users/create">
          <CreateSuggestion />
        </PrivateRoute> */}
        <PrivateRoute exact path="/panel/users/edit/:id">
          <EditUser />
        </PrivateRoute>
        {/* <PrivateRoute exact path="/panel/users/view/:id">
          <ViewSuggestion />
        </PrivateRoute> */}
        <PrivateRoute exact path="/panel/suggestions">
          <ManageSuggestions />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/create">
          <CreateSuggestion />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/edit/:id">
          <EditSuggestion />
        </PrivateRoute>
        <PrivateRoute exact path="/panel/suggestions/view/:id">
          <ViewSuggestion />
        </PrivateRoute>
        <Route path="*">
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}
