import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </>
  );
}

export default observer(App);
