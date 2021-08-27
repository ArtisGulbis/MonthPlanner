import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import ModalContainer from './components/ModalContainer';
import PrivateRoute from './components/PrivateRoute';
import StartPage from './components/StartPage';
import { useStore } from './stores/store';
import { history } from './index';
import DemoPage from './components/DemoPage';

function App() {
  const { userStore } = useStore();

  useEffect(() => {
    if (userStore.token) {
      history.push('/planner');
    }
  }, [userStore]);

  return (
    <div className="bg-gradient-to-b from-blue-400 via-indigo-500 to-blue-800">
      <ModalContainer />
      <Route exact path="/" component={StartPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Switch>
              <PrivateRoute exact path="/planner" component={MainPage} />
              <Route exact path="/demo" component={DemoPage} />
              <PrivateRoute component={MainPage} />
            </Switch>
          </>
        )}
      />
    </div>
  );
}

export default observer(App);
