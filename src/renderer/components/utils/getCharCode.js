// Core
import Store from 'electron-store';
import https from 'https';
import needle from 'needle';
import cheerio from 'cheerio';
import { CHAR_CODES, ACTIVE, CHARACTERS } from './variables';

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
 * Returns a data store shape per character entry
 * @param {string} charName
 * @param {string} charCode
 */
const getTemplate = (charName, charCode) => ({
  name: charName,
  code: charCode,
  bosses: { daily: [], weekly: [], hidden: [] },
  quests: { mapleworld: [], arcaneriver: [], hidden: [] },
});

/**
 * Sets the valid character into the data store
 * @param {string} charName
 * @param {string} charCode
 */
const setStore = (charName, charCode) => {
  store.set(ACTIVE, charName);
  store.set(CHAR_CODES, [...store.get(CHAR_CODES), charCode]);
  store.set(CHARACTERS, [
    ...store.get(CHARACTERS),
    getTemplate(charName, charCode),
  ]);
};

/**
 * Performs a network requests against the Maplestory rankings page to retrieve an image the desired character
 * @param {string} charName
 */
export const getCharCode = async (charName) => {
  if (isDupe(charName)) {
    return 'Dupe';
  }

  const url = `https://maplestory.nexon.net/rankings/overall-ranking/legendary`;
  const params = {
    pageIndex: 1,
    character_name: encodeURIComponent(charName.trim()),
    search: true,
    rebootIndex: 1,
  };

  try {
    needle('get', url, params, {
      agent,
      open_timeout: 2000,
      response_timeout: 2000,
    });

    const rawData = await needle('get', url, params, {
      agent,
      open_timeout: 2000,
      response_timeout: 2000,
    });

    const $ = cheerio.load(rawData.body);
    const link = $('img.avatar').attr('src');

    if (!link) {
      return 'Invalid Character Name';
    }

    setStore(charName, link.substring(37, link.length - 4));

    return true;
  } catch (err) {
    return false;
  }
};
