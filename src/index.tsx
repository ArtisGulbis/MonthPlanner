import React from 'react';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './stores/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './utils/graphql';
import { Router } from 'react-router-dom';

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
