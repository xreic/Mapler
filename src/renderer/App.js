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
      <Home path="/" />
    </Router>
  </LocationProvider>
);

export default hot(App);
