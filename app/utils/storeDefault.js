// Core
import Store from 'electron-store';

// Helper
import { getTemplate } from './getCharCode.js';

// Constants
import {
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  ARCANE_RIVER_QUESTS,
  MAPLE_WORLD_QUESTS,
} from '../constants/variables.js';

export const defaultStore = {
  timer: null,
  position: null,
  active: 0,
  characters: [getTemplate('DEFAULT CHARACTER', null)],
  deleting: [0],
  'bosses-daily': DAILY_BOSSES,
  'bosses-weekly': WEEKLY_BOSSES,
  'quests-maple': MAPLE_WORLD_QUESTS,
  'quests-arcane': ARCANE_RIVER_QUESTS,
};

export const validateConfig = () => {
  const store = new Store();

  const currentUserStoreKeys = Object.keys(store.get());
  const defaultStoreSchema = Object.keys(defaultStore);

  if (currentUserStoreKeys.length === defaultStoreSchema.length) {
    return;
  } else if (currentUserStoreKeys.length > defaultStoreSchema.length) {
    store.set(defaultStore);
  } else {
    const currentUserStore = store.get();
    const missingStoreKeys = defaultStoreSchema.filter(
      (key) => currentUserStore[key] === undefined
    );

    missingStoreKeys.forEach((key) => {
      store.set(key, defaultStore[key]);
    });
  }
};
