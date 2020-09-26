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
import { MainSelector } from './components/MainSelector';
import { BossSelector } from './components/Bosses/BossSelector';
import { QuestSelector } from './components/Quests/QuestSelector';

// Reach Router
let source = createMemorySource('/');
let history = createHistory(source);

// Component
const App = () => (
  <LocationProvider history={history}>
    <MainSelector />
    <Router>
      {/*
      Need character selection view that reports
      the current character to the entire app
      need to store app state

      1. Redux
      2. Hooks
      3. Subscription to Electron store
      */}
      {/*
      Home will display tracker app that reads and writes
      information in app state store
      */}
      <BossSelector path="/bosses" />
      <QuestSelector path="/quests" />
    </Router>
  </LocationProvider>
);

export default hot(App);
