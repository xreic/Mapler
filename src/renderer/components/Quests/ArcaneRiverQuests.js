// Core
import React from 'react';

// Quests
const ARCANE_RIVER_QUESTS = [
  'Vanishing Journey',
  'Chuchu Island',
  'Lachelein',
  'Arcana',
  'Morass',
  'Esfera',
];

// Component
export const ArcaneRiverQuests = () => (
  <div className="grid grid-cols-3 items-stretch">
    {ARCANE_RIVER_QUESTS.map((quest) => (
      <p key={quest} className="text-center">
        {quest}
      </p>
    ))}
  </div>
);
