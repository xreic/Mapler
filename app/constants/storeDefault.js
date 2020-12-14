import { getTemplate } from '../utils/getCharCode.js';

import {
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  ARCANE_RIVER_QUESTS,
  MAPLE_WORLD_QUESTS,
} from './variables.js';

export const defaultStore = {
  timer: null,
  position: null,
  active: 0,
  characters: [getTemplate('DEFAULT CHARACTER', null)],
  deleting: [0],
  order: {
    bosses: {
      daily: DAILY_BOSSES,
      weekly: WEEKLY_BOSSES,
    },
    quests: {
      maple: MAPLE_WORLD_QUESTS,
      arcane: ARCANE_RIVER_QUESTS,
    },
  },
};
