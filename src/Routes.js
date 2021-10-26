import React from "react";
import history from "./History";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { HomeIndex } from "./views/Home";
import { LoginIndex } from "./views/Login";
import { RegisterIndex } from "./views/Register";
import { EscolasIndex } from "./views/Escolas/";
import { TurmasIndex } from "./views/Turmas";
import { AlunosIndex } from "./views/Alunos";
import { MatriculasIndex } from "./views/Matricula";
import { getToken } from "./services/Auth";

export function Routes() {
  function loggedIn() {
    if (!getToken()) {
      return false;
    }
    return getToken() !== "null" && getToken() !== "";
  }

  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        loggedIn() ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        loggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );

  return (
    <Router history={history}>
      <Switch>
        <LoginRoute exact path="/login" component={LoginIndex} />
        <LoginRoute exact path="/registro" component={RegisterIndex} />
        <Dashboard>
          <PrivateRoute exact path="/inicio" component={HomeIndex} />
          <PrivateRoute exact path="/escolas" component={EscolasIndex} />
          <PrivateRoute exact path="/turmas" component={TurmasIndex} />
          <PrivateRoute exact path="/alunos" component={AlunosIndex} />
          <PrivateRoute exact path="/matriculas" component={MatriculasIndex} />
          <PrivateRoute exact path="/" />
        </Dashboard>
      </Switch>
    </Router>
  );
}
