// Core
import React, { useEffect, useState } from 'react';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

// Helpers
import { ursusGoldenTime, getGoldenTime } from '../utils/ursusGoldenTime';

export const Ursus = ({ isGoldenTime }) => {
  // Timer Hooks
  const [goldenTime, setGoldenTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Hook that retrieves the next UGT
  useEffect(async () => {
    let nextGoldenTime;
    do {
      nextGoldenTime = await getGoldenTime(isGoldenTime ? 1 : 0);
    } while (nextGoldenTime === 'Bad Response');

    setGoldenTime(nextGoldenTime);
  }, [isGoldenTime]);

  /**
   * Hook to update the countdown
   * Update occurs every 30 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isGoldenTime]);

  return (
    <div className={''}>
      Ursus Golden Time {isGoldenTime ? 'ends' : 'starts'} in:{' '}
      {differenceInHours(goldenTime, currentTime).toString().padStart(2, '0')}:
      {(differenceInMinutes(goldenTime, currentTime) % 60)
        .toString()
        .padStart(2, '0')}
      :
      {(differenceInSeconds(goldenTime, currentTime) % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
};
