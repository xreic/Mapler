// Core
import needle from 'needle';

export const ursusGoldenTime = async () => {
  const API = 'https://xreic.github.io/api/ursus.json';

  const { body: resets } = await needle('get', API);

  const { hours } = new Date().getUTCHours();

  for (let reset of resets) {
    if (reset[0]['hours'] <= hours && hours < reset[1]['hours']) {
      return true;
    }
  }

  return false;
};
