// Core
import React, { useContext, useEffect, useRef, useState } from 'react';
import Store from 'electron-store';

// Helpers, Components
import { ACTIVE, CHARACTERS } from './utils/variables';
import { Task } from './Task';
import { EditContext } from './context/EditContext';

// Electron store
const store = new Store({ watch: true });

export const List = ({ list }) => {
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
  });

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
