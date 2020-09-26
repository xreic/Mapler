// Core
import React from 'react';

// Daily Boss List
const WEEKLY_BOSSES = [
  'Zakum',
  'Magnus',
  'Hilla',
  'Papulatus',
  'Pierre',
  'Von Bon',
  'Crimson Queen',
  'Vellum',
  'Pink Bean',
  'Cygnus',
  'Lotus',
  'Damien',
  'Lucid',
  'Gloom',
  'Verus Hilla',
  'Darknell',
  'Black Mage',
  'Princess No',
  'Will',
];

// Component
export const WeeklyBosses = () => {
  return (
    <div className="grid grid-cols-3 items-stretch">
      {WEEKLY_BOSSES.map((boss) => (
        <p key={boss} className="text-center">
          {boss}
        </p>
      ))}
    </div>
  );
};
