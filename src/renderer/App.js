// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, Router } from '@reach/router';

// Components
import { CharacterView } from './components/CharacterView';
import { MainNav } from './components/navs/MainNav';
import { View } from './components/View';
import { List } from './components/utils/List';

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
} from './components/utils/variables';

const App = () => (
  <Location>
    {({ location }) => (
      <>
        <MainNav />

        {/*
        Currently using "primary" prop to "reset"
          scroll back to the top upon switching
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

          <CharacterView path="/" location={location} default />

          <View option={BOSSES} path={`/${BOSSES}`} location={location}>
            <List list={DAILY_BOSSES} path={`/${DAILY}`} default />
            <List list={WEEKLY_BOSSES} path={`/${WEEKLY}`} />
          </View>

          <View option={`${QUESTS}`} path={`/${QUESTS}`} location={location}>
            <List list={MAPLE_WORLD_QUESTS} path={`/${MAPLE}`} default />
            <List list={ARCANE_RIVER_QUESTS} path={`/${ARCANE}`} />
          </View>
        </Router>
      </>
    )}
  </Location>
);

export default hot(App);
