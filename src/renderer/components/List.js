// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers, Components
import { EDIT, ACTIVE, CHARACTERS } from './utils/variables';
import { Task } from './Task';

// Electron store
const store = new Store({ watch: true });

export const List = ({ list }) => {
  const [isEditting, setIsEditting] = useState(store.get(EDIT));

  const [active, setActive] = useState(store.get(ACTIVE));
  const [char, setChar] = useState(store.get(CHARACTERS)[store.get(ACTIVE)]);

  useEffect(() => {
    const unsub = store.onDidAnyChange(({ active, character }, old) => {
      // setActive(active);
      // setChar(character[active]);
    });
    return () => {
      unsub();
    };
  }, [active, char]);

  useEffect(() => {
    const unsubEdit = store.onDidChange(EDIT, (delta, _) => {
      setIsEditting(delta);
    });
    return () => {
      unsubEdit();
    };
  }, []);

  const selectionClick = (index) => {
    console.log('List.js - selectionClick');
    console.log('index:', index);
    console.log('isEditting:', isEditting);
    console.log('active:', active);
    console.table(char);
  };

  const hidingClick = (index) => {
    const character = store.get(CHARACTERS)[active];

    console.log('List.js - hidingClick');
    console.log(location.pathname);
    console.table(character);
  };

  return (
    <div className="justify-items-stretch grid grid-cols-3 gap-1">
      {list.map((item, index) => (
        <Task
          key={item}
          name={item}
          index={index}
          handleClick={isEditting ? hidingClick : selectionClick}
        />
      ))}
    </div>
  );
};
