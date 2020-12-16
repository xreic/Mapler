// Core
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import Store from 'electron-store';

// Contexts + Components
import { EditContext } from '../context/EditContext.js';
import { Task } from './Task.js';

// Helpers + Constants
import { getNextReset, triggerReset } from '../../utils/Reset.js';
import { ACTIVE, CHARACTERS } from '../../constants/variables.js';

// SCSS
import { listStyle } from './styles/List.scss';

// Electron store
const store = new Store({ watch: true });

export const List = () => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // Hooks P1
  const { isEditing } = useContext(EditContext);
  const { current: active } = useRef(store.get(ACTIVE));

  // Filter indicating which tasks to show as incomplete, complete, or hidden
  const [filter, setFilter] = useState(
    store.get(CHARACTERS)[store.get(ACTIVE)][main][sub]
  );

  // List of tasks to render
  const [list, setList] = useState(store.get(`${main}-${sub}`));

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
    const unsubOrder = store.onDidChange(`${main}-${sub}`, (taskList, _) => {
      setList(taskList);
    });

    return () => {
      unsubOrder();
    };
  }, [list]);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerReset();
    }, getNextReset() + 1);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  return (
    <div className={listStyle}>
      {list.map((item, index) => {
        if (filter[index] !== 2 || isEditing) {
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
      })}
    </div>
  );
};
