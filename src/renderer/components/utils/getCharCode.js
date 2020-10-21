// Core
import Store from 'electron-store';
import https from 'https';
import needle from 'needle';
import cheerio from 'cheerio';
import { CHAR_CODES, ACTIVE } from './variables';

const store = new Store();
const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000,
  maxSockets: 256,
  maxTotalSockets: 256,
  scheduling: 'lifo',
  timeout: 2000,
});

export const getCharCode = async (character) => {
  const url = `https://maplestory.nexon.net/rankings/overall-ranking/legendary`;
  const params = {
    pageIndex: 1,
    character_name: encodeURIComponent(character.trim()),
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

    const charCode = link.substring(37, link.length - 4);

    store.set(ACTIVE, character);
    store.set(CHAR_CODES, [...store.get(CHAR_CODES), charCode]);

    return true;
  } catch (err) {
    return false;
  }
};

export const fakeCall = async () => {
  const baseURL = 'https://google.com';

  try {
    const fakeData = await needle('get', baseURL);

    return false;
  } catch (err) {
    console.log('err');
    console.log(err);

    return false;
  }
};
