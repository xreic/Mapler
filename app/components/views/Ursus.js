// Core
import React, { useEffect, useState } from 'react';
import { differenceInHours, differenceInMinutes } from 'date-fns';

// Helpers
import { getGoldenTime } from '../../utils/ursusGoldenTime.js';

// SCSS
import { ursusNotGoldenStyle, ursusIsGoldenStyle } from './styles/Ursus.scss';

export const Ursus = ({ isGoldenTime }) => {
  // Timer Hooks
  const [goldenTime, setGoldenTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Hook that retrieves the next UGT
  useEffect(() => {
    (async () => {
      let nextGoldenTime;
      do {
        nextGoldenTime = await getGoldenTime(isGoldenTime ? 1 : 0);
      } while (nextGoldenTime === 'Bad Response');

      setGoldenTime(nextGoldenTime);
    })();
  }, [isGoldenTime]);

  /**
   * Hook to update the countdown
   * Update occurs every 30 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, [isGoldenTime]);

  if (goldenTime === null) {
    return <div className={ursusNotGoldenStyle}>📞 Calling Masarayu...</div>;
  }

  return (
    <div className={isGoldenTime ? ursusIsGoldenStyle : ursusNotGoldenStyle}>
      Ursus Golden Time {isGoldenTime ? 'ends' : 'starts'} in:{' '}
      {differenceInHours(goldenTime, currentTime).toString().padStart(2, '0')}:
      {(differenceInMinutes(goldenTime, currentTime) % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
};
