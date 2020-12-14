// Core
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router,
} from '@reach/router';

// Components
import { EditProvider } from './context/EditContext.js';
import { NavBar } from './navigation/NavBar.js';
import { CharacterView } from './character/CharacterView.js';
import { Transition } from './views/Transition.js';
import { View } from './views/View.js';
import { ViewM } from './views/ViewM.js';

// Constants
import { routes } from '../constants/routes.js';
import { MAPLE } from '../constants/variables.js';

// SCSS
import { noSelContainer } from './styles/App.scss';

// Reach Router
let source = createMemorySource('/main_window');
let history = createHistory(source);

const App = () => (
  <LocationProvider history={history}>
    <div className={noSelContainer}>
      <EditProvider>
        <NavBar />

        <Transition>
          <DndProvider backend={HTML5Backend}>
            <Router primary={false}>
              <CharacterView path="/" default />

              {routes.map(({ main, sub }) => {
                if (sub !== MAPLE) {
                  // Normal container
                  return <View key={sub} path={`/${main}/${sub}`} />;
                }

                // Special container for Ursus and event logic
                return <ViewM key={sub} path={`/${main}/${sub}`} />;
              })}
            </Router>
          </DndProvider>
        </Transition>
      </EditProvider>
    </div>
  </LocationProvider>
);

export default hot(App);
