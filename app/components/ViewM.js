// Core
import React, { useEffect, useState } from 'react';

// Component
import { List } from './List.js';
import { Ursus } from './Ursus.js';

// Helpers
import { ursusGoldenTime, getGoldenTime } from '../utils/ursusGoldenTime.js';

// SCSS
import {
  taskContainer,
  viewNormalStyle,
  viewShrunkStyle,
} from './styles/View.scss';

// Special snowflake view for Ursus
export const ViewM = ({ list }) => {
  // View Hooks
  const [isGoldenTime, setIsGoldenTime] = useState(false);

  // Hooks P2
  useEffect(() => {
    (async () => {
      // Verifies if it is Ursus Golden Time (UGT) or not
      let checkIfGoldenTime;
      do {
        checkIfGoldenTime = await ursusGoldenTime();
      } while (checkIfGoldenTime === 'Bad Response');

      setIsGoldenTime(checkIfGoldenTime);

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
  }, [isGoldenTime]);

  return (
    <>
      <Ursus isGoldenTime={isGoldenTime} />
      <div className={viewShrunkStyle}>
        <div className={taskContainer}>
          <List list={list} />
        </div>
      </div>
    </>
  );
};
