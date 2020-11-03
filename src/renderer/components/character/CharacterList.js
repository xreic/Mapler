// Core
import React, { useContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CharContext } from '../context/CharContext';
import { ACTIVE, CHARACTERS, DELETING } from '../utils/variables';

// Electron Store
const store = new Store({ watch: true });

export const CharacterList = () => {
  // Hooks P1: Initial state
  const { hideAddButton } = useContext(CharContext);
  const [activeChar, setActiveChar] = useState(store.get(ACTIVE));
  const [charList, setCharList] = useState(
    store.get(CHARACTERS).map(({ code }) => code),
  );
  const [deleteList, setDeleteList] = useState(store.get(DELETING));

  // Hooks P2: Store subscriptions

  useEffect(() => {
    const unsubActive = store.onDidChange(ACTIVE, (active, _) => {
      setActiveChar(active);
    });
    return () => {
      unsubActive();
    };
  }, []);

  // TODO: Character list not updating on deletion
  useEffect(() => {
    const unsubCharList = store.onDidChange(CHARACTERS, (characters, _) => {
      console.log('CharacterList.js - Characters');
      setCharList(characters.map(({ code }) => code));
    });

    return () => {
      unsubCharList();
    };
  });

  useEffect(() => {
    const unsubDeleteList = store.onDidChange(DELETING, (deleteList, _) => {
      console.log('CharacterList.js - Delete');
      setDeleteList(deleteList);
    });
    return () => {
      unsubDeleteList();
    };
  });

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
        {charList.map(
          (code, index) =>
            code && (
              <img
                key={code}
                src={`http://msavatar1.nexon.net/Character/${code}.png`}
                className={`rounded-full border border-red-500 ${
                  hideAddButton
                    ? deleteList[index] && 'bg-green-500'
                    : activeChar === index && 'bg-blue-500'
                }`}
                onClick={() => {
                  hideAddButton ? multiSelect(index) : handleClick(index);
                }}
              />
            ),
        )}
      </div>
    </div>
  );
};
