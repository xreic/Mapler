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
import { CharacterView } from './CharacterView';
import { MainNav } from './navs/MainNav';
import { View } from './View';
import { List } from './utils/List';

// Helpers/Declarations/Variables/Etc
import {
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MAPLE_WORLD_QUESTS,
  ARCANE_RIVER_QUESTS,
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
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
      // TODO: Solve overflow issues within views
      <CharacterView path="/" />
      <View option={BOSSES} path="/bosses">
        <List list={DAILY_BOSSES} path={`/${DAILY}`} default />
        <List list={WEEKLY_BOSSES} path={`/${WEEKLY}`} />
      </View>
      <View option={`${QUESTS}`} path={`/${QUESTS}`}>
        <List list={MAPLE_WORLD_QUESTS} path={`/${MAPLE}`} default />
        <List list={ARCANE_RIVER_QUESTS} path={`/${ARCANE}`} />
      </View>
    </Router>
  </LocationProvider>
);

export default hot(App);
