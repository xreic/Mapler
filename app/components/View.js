// Core
import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';

// Component
import { Ursus } from './Ursus';

// Helpers
import { ursusGoldenTime, getGoldenTime } from '../utils/ursusGoldenTime';
import { MAPLE } from '../constants/variables';

// SCSS
import { taskContainer, viewNormalStyle, viewShrunkStyle } from './View.scss';

export const View = ({ children }) => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // View Hooks
  const [isLoading, setIsLoading] = useState(true);
  const [isGoldenTime, setIsGoldenTime] = useState(false);

  // Hooks P2
  useEffect(() => {
    if (sub === MAPLE) {
      (async () => {
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
      })();
    }
  }, [isGoldenTime]);

  return (
    <>
      {sub === MAPLE && <Ursus isGoldenTime={isGoldenTime} />}
      <div className={sub === MAPLE ? viewShrunkStyle : viewNormalStyle}>
        <div className={taskContainer}>{children}</div>
      </div>
    </>
  );
};
