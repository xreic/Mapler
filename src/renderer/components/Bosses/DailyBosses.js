// Core
import React from 'react';

// Daily Boss List
const DAILY_BOSSES = [
  'Balrog',
  'Zakum',
  'Magnus',
  'Hilla',
  'OMNI-CLN',
  'Papulatus',
  'Pierre',
  'Von Bon',
  'Crimson Queen',
  'Vellum',
  'Von Leon',
  'Horntail',
  'Arkarium',
  'Pink Bean',
  'Gollux',
  'Ranmaru',
  'Julieta',
];

// Component
export const DailyBosses = () => {
  return (
    <div className="grid grid-cols-3 items-stretch">
      {DAILY_BOSSES.map((boss) => (
        <p key={boss} className="text-center">
          {boss}
        </p>
      ))}
    </div>
  );
};
