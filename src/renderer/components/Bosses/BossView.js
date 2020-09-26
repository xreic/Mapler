// Core
import React from 'react';
import { Router } from '@reach/router';

// Components
import { BossSelector } from './BossSelector';
import { DailyBosses } from './DailyBosses';
import { WeeklyBosses } from './WeeklyBosses';

// Component
export const BossView = () => {
  return (
    <>
      <BossSelector />
      <Router className="p-4">
        <DailyBosses path="/daily" default />
        <WeeklyBosses path="/weekly" />
      </Router>
    </>
  );
};
