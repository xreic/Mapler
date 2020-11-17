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
      let checkIfGoldenTime;

      do {
        checkIfGoldenTime = await ursusGoldenTime();
      } while (checkIfGoldenTime === 'Bad Response');

      setIsGoldenTime(checkIfGoldenTime);
      setIsLoading(false);

      let nextGoldenTime;
      do {
        nextGoldenTime = await getGoldenTime(checkIfGoldenTime ? 1 : 0);
      } while (nextGoldenTime === 'Bad Response');

      const timer = setTimeout(() => {
        setIsGoldenTime(!checkIfGoldenTime);
      }, parseInt(nextGoldenTime - new Date()));

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

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

  useEffect(async () => {
    let nextGoldenTime;
    do {
      nextGoldenTime = await getGoldenTime(isGoldenTime ? 1 : 0);
    } while (nextGoldenTime === 'Bad Response');

    setGoldenTime(nextGoldenTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
