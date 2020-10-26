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
      <div className="select-none">
        <MainNav />

        <Router primary={false}>
          <CharacterView path="/" default />

          <View option={BOSSES} path={`/${BOSSES}`} location={location}>
            <List list={DAILY_BOSSES} path={`/${DAILY}`} default />
            <List list={WEEKLY_BOSSES} path={`/${WEEKLY}`} />
          </View>

          <View option={`${QUESTS}`} path={`/${QUESTS}`} location={location}>
            <List list={MAPLE_WORLD_QUESTS} path={`/${MAPLE}`} default />
            <List list={ARCANE_RIVER_QUESTS} path={`/${ARCANE}`} />
          </View>
        </Router>
      </div>
    )}
  </Location>
);

export default hot(App);
