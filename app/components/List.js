// Core
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import Store from 'electron-store';
import needle from 'needle';

// Components
import { Task } from './Task.js';

// Helpers
import { EditContext } from './context/EditContext.js';
import { getNextReset, triggerReset } from '../utils/Reset.js';
import { ACTIVE, CHARACTERS, MAPLE } from '../constants/variables.js';

// SCSS
import { listStyle } from './styles/List.scss';

// Electron store
const store = new Store({ watch: true });

export const List = ({ list }) => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // View Hook
  const [isLoading, setIsLoading] = useState(true);
  const [isEvent, setIsEvent] = useState(false);

  // Hooks P1
  const { isEditing } = useContext(EditContext);
  const { current: active } = useRef(store.get(ACTIVE));
  const [filter, setFilter] = useState(
    store.get(CHARACTERS)[store.get(ACTIVE)][main][sub]
  );

  // Hooks P2
  useEffect(() => {
    const unsubFilter = store.onDidChange(CHARACTERS, (charList, _) => {
      setFilter(charList[active][main][sub]);
    });

    return () => {
      unsubFilter();
    };
  }, [filter]);

  useEffect(() => {
    if (sub === MAPLE) {
      (async () => {
        const { body } = await needle(
          'get',
          'https://xreic.github.io/api/event.json'
        );

        setIsEvent(body.isEvent);
      })();
    }

    setIsLoading(false);
    const timer = setTimeout(() => {
      const chars = store.get(CHARACTERS);
      const resetChars = triggerReset(chars);
      store.set(CHARACTERS, resetChars);
      setFilter(resetChars[store.get(ACTIVE)][main][sub]);
    }, getNextReset() + 1);

    return () => {
      clearTimeout(timer);
    };
  }, [filter]);

  // Handlers
  const handleClick = (index) => {
    const tempChar = store.get(CHARACTERS)[store.get(ACTIVE)];
    tempChar[main][sub][index] = isEditing
      ? tempChar[main][sub][index] === 2
        ? 0
        : 2
      : tempChar[main][sub][index]
      ? 0
      : 1;

    const allChars = store.get(CHARACTERS);
    allChars[active] = tempChar;

    store.set(CHARACTERS, allChars);
  };

  if (isLoading) return null;

  return (
    <div className={listStyle}>
      {list.map((item, index) => {
        /**
         * Filter Logic
         *  1. If either item is supposed to be:
         *    A. If hidden (filter[index] => 2)
         *        DON'T return currently mapped Task to be rendered
         *
         *    B. If NOT hidden or editing mode is ON, then render:
         *      1. If view is NOT currently under the "Maple World" tab
         *           Return tasks (daily bosses, weekly bosses, and arcane river dailies) normally
         *
         *      2. Else if there is an event currently running
         *          (Implies current under "Maple World" tab)
         *          Return all task
         *
         *      3. Else if there is NOT an event currently running
         *          (Implies current under "Maple World" tab)
         *          Return all tasks that are NOT event related
         *
         */
        if (filter[index] !== 2 || isEditing) {
          if (sub !== MAPLE || isEvent) {
            return (
              <Task
                key={item}
                name={item}
                index={index}
                handleClick={handleClick}
                filter={filter[index]}
              />
            );
          }

          if (index < 14) {
            // Implied that sub === MAPLE is true
            // Implied that isEvent is false
            return (
              <Task
                key={item}
                name={item}
                index={index}
                handleClick={handleClick}
                filter={filter[index]}
              />
            );
          }
        }
      })}
    </div>
  );
};
