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
import { EditProvider } from './context/EditContext.js';
import { Transition } from './Transition.js';
import { NavBar } from './navigation/NavBar.js';
import { CharacterView } from './character/CharacterView.js';
import { View } from './View.js';
import { List } from './List.js';

// Helpers
import { routes } from '../constants/routes.js';

// SCSS
import { noSelContainer } from './styles/App.scss';

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
      <div className={noSelContainer} onDragStart={handleDrag}>
        <EditProvider>
          <NavBar />

          <Transition>
            <Router primary={false}>
              <CharacterView path="/" default />

              {routes.map(({ path, sub }) => (
                <View key={path} path={path}>
                  {sub.map(({ path, list, isDefault }, index) =>
                    !index ? (
                      <List key={path} path={path} list={list} default />
                    ) : (
                      <List key={path} path={path} list={list} />
                    )
                  )}
                </View>
              ))}
            </Router>
          </Transition>
        </EditProvider>
      </div>
    </LocationProvider>
  );
};

export default hot(App);
