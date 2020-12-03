import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MAPLE_WORLD_QUESTS,
  ARCANE_RIVER_QUESTS,
} from '../constants/variables.js';

export const routes = [
  {
    path: BOSSES,
    sub: [
      { path: DAILY, list: DAILY_BOSSES },
      { path: WEEKLY, list: WEEKLY_BOSSES },
    ],
  },
  {
    path: QUESTS,
    sub: [
      { path: MAPLE, list: MAPLE_WORLD_QUESTS },
      { path: ARCANE, list: ARCANE_RIVER_QUESTS },
    ],
  },
];
