import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './components/RegisterPage';
import StartPage from './components/StartPage';

function App() {
  return (
    <>
      <Route exact path="/" component={StartPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Switch>
              <PrivateRoute exact path="/planner" component={MainPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
