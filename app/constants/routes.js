// Constants
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
  { main: BOSSES, sub: DAILY, list: DAILY_BOSSES },
  { main: BOSSES, sub: WEEKLY, list: WEEKLY_BOSSES },
  { main: QUESTS, sub: MAPLE, list: MAPLE_WORLD_QUESTS },
  { main: QUESTS, sub: ARCANE, list: ARCANE_RIVER_QUESTS },
];
