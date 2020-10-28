// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, Router } from '@reach/router';

// Components
import { CharProvider } from './components/context/CharContext';
import { EditProvider } from './components/context/EditContext';
import { Transition } from './components/utils/Transition';
import { NavBar } from './components/NavBar';
import { CharacterView } from './components/character/CharacterView';
import { List } from './components/List';

// Helpers
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
const View = ({ children }) => (
  <div className="overflow-y-scroll px-2 py-2 h-64">{children}</div>
);

const App = () => {
  // TODO: Remove later for drag-n-move character arrangement (Future feature)
  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    // TODO: Use LocationProvider later on (Maybe?)
    <Location>
      {({ location }) => (
        <div className="select-none" onDragStart={handleDrag}>
          <EditProvider>
            <NavBar />

            <Transition location={location}>
              <Router primary={false}>
                {/* Character View */}
                <CharacterView path="/" default />

                {/* Bosses View */}
                <View path={`/${BOSSES}`}>
                  <List path={`/${DAILY}`} list={DAILY_BOSSES} default />
                  <List path={`/${WEEKLY}`} list={WEEKLY_BOSSES} />
                </View>

                {/* Quests View */}
                <View path={`/${QUESTS}`}>
                  <List path={`/${MAPLE}`} list={MAPLE_WORLD_QUESTS} default />
                  <List path={`/${ARCANE}`} list={ARCANE_RIVER_QUESTS} />
                </View>
              </Router>
            </Transition>
          </EditProvider>
        </div>
      )}
    </Location>
  );
};

export default hot(App);
