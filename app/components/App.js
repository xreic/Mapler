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
import { ViewM } from './ViewM.js';

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
          <Router primary={false}>
            <CharacterView path="/" default />

            {routes.map(({ main, sub, list }) => {
              if (sub !== MAPLE) {
                // Normal container
                return <View key={sub} path={`/${main}/${sub}`} list={list} />;
              }

              // Special container for Ursus and event logic
              return <ViewM key={sub} path={`/${main}/${sub}`} list={list} />;
            })}
          </Router>
        </Transition>
      </EditProvider>
    </div>
  </LocationProvider>
);

export default hot(App);
