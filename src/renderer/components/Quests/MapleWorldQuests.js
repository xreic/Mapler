// Core
import React from 'react';

// Quests
const MAPLE_WORLD_QUESTS = [
  'Meso Piggy Bank',
  'Maple Tour',
  'Monster Park',
  'Ursus',
  'Legion',
  'Commerci Voyages',
  'Yu Garden',
  'Daily Gift',
  'Phantom Forest',
  'Guild Buff',
  'Scrapyard',
  'Dark World Tree',
  'Mu Lung Dojo',
  'Kritias',
];

// Component
export const MapleWorldQuests = () => (
  <div className="grid grid-cols-3 items-stretch">
    {MAPLE_WORLD_QUESTS.map((quest) => (
      <p key={quest} className="text-center">
        {quest}
      </p>
    ))}
  </div>
);
