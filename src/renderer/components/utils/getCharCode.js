// Core
import Store from 'electron-store';
import needle from 'needle';
import cheerio from 'cheerio';
import { CHAR_CODES, ACTIVE } from './variables';

const store = new Store();

export const getCharCode = async (character) => {
  const url = `https://maplestory.nexon.net/rankings/overall-ranking/legendary?pageIndex=1&character_name=${character}&search=true&region=&rebootIndex=1#ranking`;

  try {
    needle('get', url, {
      open_timeout: 2000,
      read_timeout: 2000,
      response_timeout: 2000,
    });
    var rawData = await needle('get', url, {
      open_timeout: 10000,
      read_timeout: 10000,
      response_timeout: 10000,
    });

    const $ = cheerio.load(rawData.body);
    const link = $('img.avatar').attr('src');
    const charCode = link.substring(37, link.length - 4);

    store.set(ACTIVE, character);
    store.set(CHAR_CODES, [...store.get(CHAR_CODES), charCode]);

    return true;
  } catch (err) {
    console.log('err');
    console.log(err);

    return false;
  }
};
