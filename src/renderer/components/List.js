// Core
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import Store from 'electron-store';

// Components
import { Task } from './Task';

// Helpers
import { EditContext } from './context/EditContext';
import { getNextReset, triggerReset } from './utils/resetHelpers';
import { ACTIVE, CHARACTERS } from './utils/variables';

// Electron store
const store = new Store({ watch: true });

export const List = ({ list }) => {
  const location = useLocation();
  const [_, main, sub] = location.pathname.split('/');

  // Hooks P1
  const { isEditing } = useContext(EditContext);
  const { current: active } = useRef(store.get(ACTIVE));
  const [filter, setFilter] = useState(
    store.get(CHARACTERS)[store.get(ACTIVE)][main][sub],
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
    const timer = setTimeout(() => {
      const chars = store.get(CHARACTERS);
      const resetChars = triggerReset(chars);
      store.set(CHARACTERS, resetChars);
      setFilter(resetChars[store.get(ACTIVE)][main][sub]);
    }, 2000);

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

  return (
    <div className="justify-items-stretch grid grid-cols-3 gap-2">
      {list.map(
        (item, index) =>
          (filter[index] !== 2 || isEditing) && (
            <Task
              key={item}
              name={item}
              index={index}
              handleClick={handleClick}
              filter={filter[index]}
            />
          ),
      )}
    </div>
  );
};
