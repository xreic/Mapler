// Core
import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { differenceInHours, differenceInMinutes } from 'date-fns';

// Helpers
import { ursusGoldenTime, getGoldenTime } from './utils/ursusGoldenTime';
import { MAPLE } from './utils/variables';

export const View = ({ children }) => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // View Hooks
  const [isLoading, setIsLoading] = useState(true);
  const [isGoldenTime, setIsGoldenTime] = useState(false);

  // Hooks P2
  useEffect(async () => {
    if (sub === MAPLE) {
      // Verifies if it is Ursus Golden Time (UGT) or not
      let checkIfGoldenTime;
      do {
        checkIfGoldenTime = await ursusGoldenTime();
      } while (checkIfGoldenTime === 'Bad Response');

      setIsGoldenTime(checkIfGoldenTime);

      // Allows for the Ursus component to be loaded
      setIsLoading(false);

      // Retrieves the next UGT to determine when to trigger a re-render
      let nextGoldenTime;
      do {
        nextGoldenTime = await getGoldenTime(checkIfGoldenTime ? 1 : 0);
      } while (nextGoldenTime === 'Bad Response');

      // Set timeout to trigger a re-render with the next state of isGoldenTime
      const timer = setTimeout(() => {
        setIsGoldenTime(!checkIfGoldenTime);
      }, parseInt(nextGoldenTime - new Date()) + 1);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isGoldenTime]);

  return (
    <>
      {sub === MAPLE && !isLoading && <Ursus isGoldenTime={isGoldenTime} />}
      <div
        className={`overflow-y-scroll px-2 py-2 bg-gray-500 ${
          sub === MAPLE && !isLoading ? 'h-269px' : 'h-287px'
        } `}
      >
        {children}
      </div>
    </>
  );
};

const Ursus = ({ isGoldenTime }) => {
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
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [isGoldenTime]);

  return (
    <div
      className={`text-center text-xs ${
        isGoldenTime ? 'bg-yellow-400' : 'bg-gray-500'
      }`}
    >
      Ursus Golden Time {isGoldenTime ? 'ends' : 'starts'} in:{' '}
      {differenceInHours(goldenTime, currentTime).toString().padStart(2, '0')}:
      {(differenceInMinutes(goldenTime, currentTime) % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
};
