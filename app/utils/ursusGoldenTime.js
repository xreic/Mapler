// Core
import needle from 'needle';

// Helpers
import { splitTime } from './Reset.js';

/**
 * Check if it is currently Ursus Golden Time (UGT)
 */
export const ursusGoldenTime = async () => {
  try {
    const times = await getUrsusTimes();
    if (!times) return 'Bad Response';

    const now = new Date();
    const { year, month, date } = splitTime(now);

    for (let time of times) {
      const startTime = new Date(
        Date.UTC(year, month, date, time[0]['hours'], time[0]['minutes'])
      );
      const endTime = new Date(
        Date.UTC(year, month, date, time[1]['hours'], time[1]['minutes'])
      );

      if (startTime <= now && now <= endTime) return true;
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
    const { year, month, date } = splitTime(now);

    for (let time of times) {
      const scheduledTime = new Date(
        Date.UTC(
          year,
          month,
          date,
          time[section]['hours'],
          time[section]['minutes']
        )
      );

      if (now < scheduledTime) return scheduledTime;
    }

    return new Date(
      Date.UTC(year, month, date + 1, times[0][section]['hours'])
    );
  } catch (err) {
    return false;
  }
};

const getUrsusTimes = async () => {
  try {
    const { body } = await needle(
      'get',
      'https://xreic.github.io/api/ursus.json'
    );
    return body;
  } catch (err) {
    return false;
  }
};
