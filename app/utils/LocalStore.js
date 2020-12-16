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
  BOSSES,
  DAILY,
  WEEKLY,
  QUESTS,
  MAPLE,
  ARCANE,
  CHARACTERS,
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

  const configKeys = Object.keys(store.get());
  const defaultSchemaKeys = Object.keys(defaultStore);

  if (configKeys.length === defaultSchemaKeys.length) {
    return;
  } else if (configKeys.length > defaultSchemaKeys.length) {
    store.set(defaultStore);
  } else {
    const currentUserStore = store.get();
    const missingStoreKeys = defaultSchemaKeys.filter(
      (key) => currentUserStore[key] === undefined
    );

    missingStoreKeys.forEach((key) => {
      store.set(key, defaultStore[key]);
    });
  }
};

export const updateConfig = () => {
  const store = new Store();

  const checkKeys = [
    `${BOSSES}-${DAILY}`,
    `${BOSSES}-${WEEKLY}`,
    `${QUESTS}-${ARCANE}`,
    `${QUESTS}-${MAPLE}`,
  ];

  for (let i = 0; i < checkKeys.length; i++) {
    const key = checkKeys[i];
    const partition = store.get(key);

    if (i < 3) {
      // Will always be an array storing items
      store.set(key, updateArrayStore(partition, key));
    } else {
      // Will always be an object (dictionary) storing items
      store.set(key, updateObjectStore(partition, key));
    }
  }
};

/**
 * Returns an array of the items to be set into the current config.json
 * @param {string[]} partition - partition of the user's current config.json
 * @param {string} key - key being altered in the user's config.json
 */
const updateArrayStore = (partition, key) => {
  if (defaultStore[key].length > partition.length) {
    // When items need to be added
    const missingItems = defaultStore[key].filter(
      (item) => !partition.find((storedItem) => storedItem === item)
    );

    // Return a list with the new item(s) appended
    return [...partition, ...missingItems];
  } else if (defaultStore[key].length < partition.length) {
    // When items need to be removed
    let removedIndices = [];
    const keptItems = partition.filter((storedItem, index) =>
      defaultStore[key].find((item) => {
        if (item !== storedItem) return false;
        removedIndices[index] = 1;
        return true;
      })
    );

    // Update each character to reflect the changes
    updatePerCharTracker(key, removedIndices);

    // Return the list of items after filtering
    return keptItems;
  } else {
    return partition;
  }
};

/**
 * Returns an object of the items to be set into the current config.json
 * @param {{name: string, type: string}[]} partition - partition of the user's current config.json
 * @param {string} key - key being altered in the user's config.json
 */
const updateObjectStore = (partition, key) => {
  // There are items to add
  if (defaultStore[key].length > partition.length) {
    const missingItems = [];
    const partitionKeys = partition.map((item) => item.name);
    const defaultKeys = defaultStore[key].map((item) => item.name);

    defaultKeys.filter((item, index) => {
      if (!partitionKeys.find((storedItem) => storedItem === item)) {
        missingItems.push(defaultStore[key][index]);
        return true;
      }
    });

    return [...partition, ...missingItems];
  }
  // There are items to remove
  else if (defaultStore[key].length < partition.length) {
    let removedIndices = [];
    const keptItems = partition.filter((storedItem, index) =>
      defaultStore[key].find((item) => {
        if (JSON.stringify(item) != JSON.stringify(storedItem)) return false;
        removedIndices[index] = 1;
        return true;
      })
    );

    // Update each character to reflect the changes
    updatePerCharTracker(key, removedIndices);

    // Return the list of items after filtering
    return keptItems;
  }
  // There are no changes to be made
  else {
    return partition;
  }
};

/**
 * Updates each characters boss and quest tracking, when items have been removed
 * @param {string} key - key being altered within the config
 * @param {number[]} removed - indices that have been removed
 */
const updatePerCharTracker = (key, removed) => {
  const store = new Store();
  const [main, sub] = key.split('-');

  const characters = store.get(CHARACTERS);
  const updated = [];

  for (let char of characters) {
    char[main][sub] = char[main][sub].filter(
      (_, index) => removed[index] !== undefined
    );
    updated.push(char);
  }

  store.set(CHARACTERS, updated);
};
