// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers/Declarations/Variables/Etc
import { ACTIVE, CHARACTERS } from './utils/variables';
import { AddChar } from './AddChar';

// Electron Store
const store = new Store({ watch: true });

export const CharacterView = () => {
  const [activeChar, setActiveChar] = useState(store.get(ACTIVE));
  const [charList, setCharList] = useState(
    store.get(CHARACTERS).map(({ code }) => code),
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Subscription to store for active character
  useEffect(() => {
    const unsubActive = store.onDidChange(ACTIVE, (newChange, _) => {
      setActiveChar(newChange);
    });

    return () => {
      unsubActive();
    };
  }, []);

  // Subscription to store for character list
  useEffect(() => {
    const unsubList = store.onDidChange(CHARACTERS, (newChange, _) => {
      setCharList(newChange.map(({ code }) => code));
    });

    return () => {
      unsubList();
    };
  }, []);

  const handleClick = (char) => {
    store.set(ACTIVE, char);
  };

  if (charList.length > 0) {
    return (
      <>
        <div className="overflow-y-scroll justify-items-center grid grid-cols-3 gap-2 px-2 py-2 h-64">
          {charList.map((char) => (
            <img
              key={`${char}`}
              src={`http://msavatar1.nexon.net/Character/${char}.png`}
              className={`object-scale-down inline-block border border-red-500 ${
                activeChar === char && 'bg-blue-500'
              }`}
              onClick={() => handleClick(char)}
            />
          ))}
        </div>
        <div className="flex">
          <button className="flex-1 text-center border border-red-500 w-full">
            Delete
          </button>
          <AddChar />
        </div>
      </>
    );
  }

  return (
    <div className="flex">
      <button className="flex-1 text-center border border-red-500 w-full">
        Delete
      </button>
      <AddChar />
    </div>
  );
};
