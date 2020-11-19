// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router,
} from '@reach/router';

// Components
import { EditProvider } from './components/context/EditContext';
import { Transition } from './components/utils/Transition';
import { NavBar } from './components/navigation/NavBar';
import { CharacterView } from './components/character/CharacterView';
import { View } from './components/View';
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

// Reach Router
let source = createMemorySource('/main_window');
let history = createHistory(source);

const App = () => {
  // TODO: Remove later for drag-n-move character arrangement (Future feature)
  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    <LocationProvider history={history}>
      <div className="select-none" onDragStart={handleDrag}>
        <EditProvider>
          <NavBar />

          <Transition>
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
    </LocationProvider>
  );
};

export default hot(App);
