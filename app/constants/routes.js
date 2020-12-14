// Constants
import {
  BOSSES,
  QUESTS,
  DAILY,
  WEEKLY,
  MAPLE,
  ARCANE,
} from '../constants/variables.js';

export const routes = [
  { main: BOSSES, sub: DAILY },
  { main: BOSSES, sub: WEEKLY },
  { main: QUESTS, sub: MAPLE },
  { main: QUESTS, sub: ARCANE },
];
