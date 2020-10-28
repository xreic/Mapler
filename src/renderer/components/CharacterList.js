// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
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
    const unsub = store.onDidAnyChange((delta, _) => {
      setActiveChar(delta.active);
      setCharList(delta.characters.map(({ code }) => code));
      setDeleteList(delta.deleting);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleClick = (index) => {
    store.set(ACTIVE, index);
  };

  const multiSelect = (index) => {
    const deleteList = store.get(DELETING);
    deleteList[index] = deleteList[index] === 0 ? 1 : 0;
    store.set(DELETING, deleteList);
  };

  return (
    <div className="overflow-y-scroll px-2 py-2 h-64">
      <div className="justify-items-center grid grid-cols-3 gap-2">
        {charList.map((char, index) => (
          <img
            key={char}
            src={`http://msavatar1.nexon.net/Character/${char}.png`}
            className={`rounded-full border border-red-500 ${
              hidingAdd
                ? deleteList[index] && 'bg-green-500'
                : activeChar === index && 'bg-blue-500'
            }`}
            onClick={() => {
              hidingAdd ? multiSelect(index) : handleClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
