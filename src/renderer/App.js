// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, Router } from '@reach/router';

// Components
import { Transition } from './components/utils/Transition';
import { NavBar } from './components/NavBar';
import { CharacterView } from './components/CharacterView';
import { List } from './components/List';

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

// Mini-components
const View = ({ children }) => {
  return <div className="overflow-y-scroll px-2 py-2 h-64">{children}</div>;
};

const App = () => {
  // TODO: Remove later for drag-n-move character arrangement (Future feature)
  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    // TODO: Use LocationProvider later on (Maybe?)
    <Location>
      {/* TODO: me dumb remove location from all props and access normally later */}
      {({ location }) => (
        <div className="select-none" onDragStart={handleDrag}>
          <NavBar location={location} />

          <Transition location={location}>
            <Router primary={false}>
              <CharacterView path="/" default />

              <View path={`/${BOSSES}`}>
                <List path={`/${DAILY}`} list={DAILY_BOSSES} default />
                <List path={`/${WEEKLY}`} list={WEEKLY_BOSSES} />
              </View>

              <View path={`/${QUESTS}`}>
                <List path={`/${MAPLE}`} list={MAPLE_WORLD_QUESTS} default />
                <List path={`/${ARCANE}`} list={ARCANE_RIVER_QUESTS} />
              </View>
            </Router>
          </Transition>
        </div>
      )}
    </Location>
  );
};

export default hot(App);
