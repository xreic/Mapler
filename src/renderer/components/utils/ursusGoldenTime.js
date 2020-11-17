// Core
import needle from 'needle';

// Helpers
import { splitTime } from './resetHelpers';

/**
 * Check if it is currently Ursus Golden Time
 */
export const ursusGoldenTime = async () => {
  try {
    const times = await getUrsusTimes();
    if (!times) return 'Bad Response';

    const hours = new Date().getUTCHours();

    for (let time of times) {
      if (time[0]['hours'] <= hours && hours < time[1]['hours']) return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Returns a Date object of the next "start" or "end" time of Ursus Golden Time
 * @param {number} section "0" or "1" to determine to get "start" or "end" times of Ursus Golden Time
 */
export const getGoldenTime = async (section) => {
  try {
    const times = await getUrsusTimes();
    if (!times) return 'Bad Response';

    const now = new Date();
    const { year, month, date, hours } = splitTime(now);

    for (let time of times) {
      if (time[0]['hours'] <= hours && hours < time[1]['hours'])
        return new Date(Date.UTC(year, month, date, time[section]['hours']));
    }

    return new Date(
      Date.UTC(year, month, date + 1, times[0][section]['hours']),
    );
  } catch (err) {
    return false;
  }
};

const getUrsusTimes = async () => {
  const API = 'https://xreic.github.io/api/ursus.json';
  try {
    const { body } = await needle('get', API);
    return body;
  } catch (err) {
    return false;
  }
};
