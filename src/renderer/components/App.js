// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Router,
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

// Components
import { MainNav } from './navs/MainNav';
import { View } from './View';
import { List } from './utils/List';

// Helpers
import {
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MAPLE_WORLD_QUESTS,
  ARCANE_RIVER_QUESTS,
} from './utils/variables';

// Reach Router
let source = createMemorySource('/');
let history = createHistory(source);

// Component
const App = () => (
  <LocationProvider history={history}>
    <MainNav />
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
      <View option="bosses" path="/">
        <List list={DAILY_BOSSES} path="/daily" default />
        <List list={WEEKLY_BOSSES} path="/weekly" />
      </View>
      <View option="quests" path="/quests">
        <List list={MAPLE_WORLD_QUESTS} path="/maple" default />
        <List list={ARCANE_RIVER_QUESTS} path="/arcane" />
      </View>
    </Router>
  </LocationProvider>
);

export default hot(App);
