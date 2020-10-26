// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Location, Router } from '@reach/router';

// Components
import { Transition } from './components/utils/Transition';
import { NavBar } from './components/NavBar';
import { CharacterView } from './components/CharacterView';
import { Task } from './components/Task';

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

const List = ({ list }) => (
  <div className="justify-items-stretch grid grid-cols-3 gap-1">
    {list.map((item) => (
      <Task key={item} name={item} />
    ))}
  </div>
);

const App = () => {
  // TODO: Remove later for drag-n-move character arrangement
  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    <Location>
      {({ location }) => (
        <div className="select-none" onDragStart={handleDrag}>
          <NavBar location={location} />

          <Transition location={location}>
            <Router primary={false}>
              <CharacterView path="/" default />

              <View path={`/${BOSSES}`}>
                <List list={DAILY_BOSSES} path={`/${DAILY}`} default />
                <List list={WEEKLY_BOSSES} path={`/${WEEKLY}`} />
              </View>

              <View path={`/${QUESTS}`}>
                <List list={MAPLE_WORLD_QUESTS} path={`/${MAPLE}`} default />
                <List list={ARCANE_RIVER_QUESTS} path={`/${ARCANE}`} />
              </View>
            </Router>
          </Transition>
        </div>
      )}
    </Location>
  );
};

export default hot(App);
