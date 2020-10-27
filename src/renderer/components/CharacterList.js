// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Components and Helpers
import { ACTIVE, CHARACTERS, DELETING } from './utils/variables';

// Electron Store
const store = new Store({ watch: true });

export const CharacterList = ({ hidingAdd }) => {
  // Hooks P1: Initial state
  const [activeChar, setActiveChar] = useState(store.get(ACTIVE));
  const [charList, setCharList] = useState(
    store.get(CHARACTERS).map(({ code }) => code) || [],
  );
  const [deleteList, setDeleteList] = useState(store.get(DELETING));

  // Hooks P2: Store subscriptions
  useEffect(() => {
    const unsub = store.onDidAnyChange((delta, old) => {
      setActiveChar(delta.active);
      setCharList(delta.characters.map(({ code }) => code));
      setDeleteList(delta.deleting);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleClick = (char) => {
    store.set(ACTIVE, char);
  };

  const multiSelect = (char) => {
    let newList = store.get(DELETING);
    const found = newList.indexOf(char);

    found === -1 ? newList.push(char) : newList.splice(found, 1);
    store.set(DELETING, newList);
  };

  return (
    <div className="overflow-y-scroll px-2 py-2 h-64">
      <div className="justify-items-center grid grid-cols-3 gap-2">
        {charList.map((char) => (
          <img
            key={char}
            src={`http://msavatar1.nexon.net/Character/${char}.png`}
            className={`rounded-full border border-red-500 ${
              hidingAdd
                ? deleteList.indexOf(char) !== -1 && 'bg-green-500'
                : activeChar === char && 'bg-blue-500'
            }`}
            onClick={() => {
              hidingAdd ? multiSelect(char) : handleClick(char);
            }}
          />
        ))}
      </div>
    </div>
  );
};
