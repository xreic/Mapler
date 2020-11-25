// Core
import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { createUseStyles } from 'react-jss';

// Component
import { Ursus } from './Ursus';

// Helpers
import { ursusGoldenTime, getGoldenTime } from '../utils/ursusGoldenTime';
import { MAPLE } from '../constants/variables';

const useStyle = createUseStyles({
  taskContainer: ({ shrink }) => ({
    overflowY: 'hidden',
    padding: '0.5rem',
    height: shrink ? '269px' : '287px',
    BgOpacity: 1,
    backgroundColor: '#a0aec0',
    backgroundColor: 'rgba(160, 174, 192, var(--bg-opacity))',
  }),
});

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

  const { taskContainer } = useStyle({ shrink: sub === MAPLE && !isLoading });

  return (
    <>
      {sub === MAPLE && !isLoading && <Ursus isGoldenTime={isGoldenTime} />}
      <div className={taskContainer}>{children}</div>
    </>
  );
};
