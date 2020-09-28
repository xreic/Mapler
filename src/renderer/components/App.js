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

    {/*
    Currently using "primary" prop to "reset"
      scroll back to the top upon switching
      TODO: Bugged with nested routes
    */}
    <Router primary={false}>
      {/*
      Need character selection view that reports
        the current character to the entire app
        need to store app state

      More likely a combination of 2 + 3

      1. Redux (Least likely)
      2. Hooks
      3. Subscription to Electron store
      */}

      {/*
      TODO: Solve overflow issues within views
      */}
      <CharacterView path="/" />

      <View option={BOSSES} path={`/${BOSSES}`}>
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
