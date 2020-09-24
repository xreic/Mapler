// Dependencies
import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

// Components
import { Home } from './components/Home';

// Reach Router
let source = createMemorySource('/');
let history = createHistory(source);

const App = () => (
  <LocationProvider history={history}>
    <Router>
      {/*
      Need character selection view that reports
      the current character to the entire app
      need to store app state

      1. Redux
      2. Hooks
      3. Subscription to Electron store
      */}
      {/*
      Home will display tracker app that reads and writes
      information in app state store
      */}
      <Home path="/" />
    </Router>
  </LocationProvider>
);

export default hot(App);
