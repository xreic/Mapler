// Core
import Store from 'electron-store';
import https from 'https';
import needle from 'needle';
import cheerio from 'cheerio';

// Helpers
import {
  ACTIVE,
  CODES,
  CHARACTERS,
  DELETING,
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MAPLE_WORLD_QUESTS,
  ARCANE_RIVER_QUESTS,
} from './variables';

const store = new Store();
const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 256,
  maxTotalSockets: 256,
  scheduling: 'lifo',
  timeout: 2000,
});

/**
 * Returns a boolean whether or not the character is stored already
 * @param {string} charName
 */
const isDupe = (charName) =>
  store.get(CHARACTERS).some(({ name }) => charName === name);

/**
 * Returns a boolean whether or not the character is the default character
 * @param {object} char
 */
const checkIfDefault = ({ code }) => !code;

/**
 * Returns a data store shape per character entry
 * @param {string} charName
 * @param {string} charCode
 */
export const getTemplate = (charName, charCode) => ({
  name: charName,
  code: charCode,
  bosses: {
    daily: new Array(DAILY_BOSSES.length).fill(0),
    weekly: new Array(WEEKLY_BOSSES.length).fill(0),
  },
  quests: {
    maple: new Array(MAPLE_WORLD_QUESTS.length).fill(0),
    arcane: new Array(ARCANE_RIVER_QUESTS.length).fill(0),
  },
});

/**
 * Sets the valid character into the data store
 * @param {string} charName
 * @param {string} charCode
 */
const setStore = (charName, charCode) => {
  const characters = store.get(CHARACTERS);
  const charCodes = store.get(CODES);

  if (checkIfDefault(characters[0])) {
    characters.shift();
    charCodes.shift();
  }

  const currentActive = store.get(ACTIVE);

  store.set({
    active: currentActive === null ? 0 : characters.length,
    characters: [...characters, getTemplate(charName, charCode)],
    deleting: new Array(characters.length + 1).fill(0),
  });
};

// TODO: Add abort functionality
/**
 * Performs a network requests against the Maplestory rankings page to retrieve an image the desired character
 * @param {string} charName
 */
export const getCharCode = async (charName) => {
  if (isDupe(charName)) return true;

  const url = `https://maplestory.nexon.net/rankings/overall-ranking/legendary`;
  const params = {
    pageIndex: 1,
    character_name: charName.trim(),
    search: true,
    rebootIndex: 1,
  };

  try {
    const rawData = await needle('get', url, params, {
      agent,
      open_timeout: 5000,
      response_timeout: 5000,
    });

    const $ = cheerio.load(rawData.body);
    const link = $('img.avatar').attr('src');

    if (!link) return 'Invalid Character Name';

    setStore(charName, link.substring(37, link.length - 4));

    return true;
  } catch (err) {
    return false;
  }
};

export const activateDelete = () => {
  const deleteList = store.get(DELETING);

  if (!deleteList.some((item) => item === 1)) return;

  const characters = store
    .get(CHARACTERS)
    .filter((_, index) => !deleteList[index]);

  store.set({
    active: null,
    characters: characters.length
      ? characters
      : [getTemplate('DEFAULT CHARACTER', null)],
    deleting: new Array(characters.length ? characters.length : 1).fill(0),
  });
};
