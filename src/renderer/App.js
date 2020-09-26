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
import { BossView } from './components/Bosses/BossView';
import { DailyBosses } from './components/Bosses/DailyBosses';
import { WeeklyBosses } from './components/Bosses/WeeklyBosses';
import { QuestView } from './components/Quests/QuestView';
import { MapleWorldQuests } from './components/Quests/MapleWorldQuests';
import { ArcaneRiverQuests } from './components/Quests/ArcaneRiverQuests';

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
      <BossView path="/">
        <DailyBosses path="/daily" default />
        <WeeklyBosses path="/weekly" />
      </BossView>
      <QuestView path="/quests">
        <MapleWorldQuests path="/maple" default />
        <ArcaneRiverQuests path="/arcane" />
      </QuestView>
    </Router>
  </LocationProvider>
);

export default hot(App);
