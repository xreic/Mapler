// Core
import React, { useEffect, useState } from 'react';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { createUseStyles } from 'react-jss';

// Helpers
import { ursusGoldenTime, getGoldenTime } from '../utils/ursusGoldenTime';

const useStyle = createUseStyles({
  ursusStyle: ({ isGoldenTime }) => ({
    textAlign: 'center',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',

    BgOpacity: 1,
    backgroundColor: isGoldenTime ? '#f6e05e' : '#cbd5e0',
    backgroundColor: isGoldenTime
      ? 'rgba(246, 224, 94, var(--bg-opacity))'
      : 'rgba(203, 213, 224, var(--bg-opacity))',
  }),
});

export const Ursus = ({ isGoldenTime }) => {
  const { ursusStyle } = useStyle({ isGoldenTime });

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
    <div className={ursusStyle}>
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
