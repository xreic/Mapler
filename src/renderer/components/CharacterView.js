// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Components and Helpers
import { ACTIVE, CHARACTERS } from './utils/variables';
import { DeleteChars } from './DeleteChars';
import { AddChars } from './AddChars';

// Electron Store
const store = new Store({ watch: true });

export const CharacterView = () => {
  // Hooks P1: Initial state
  const [activeChar, setActiveChar] = useState(store.get(ACTIVE));
  const [charList, setCharList] = useState(
    store.get(CHARACTERS).map(({ code }) => code) || [],
  );
  const [deleteList, setDeleteList] = useState([]);

  // Hooks P2: Subscriptions to store
  useEffect(() => {
    const unsubActive = store.onDidChange(ACTIVE, (newChange, _) => {
      setActiveChar(newChange);
    });

    return () => {
      unsubActive();
    };
  }, []);

  useEffect(() => {
    const unsubList = store.onDidChange(CHARACTERS, (newChange, _) => {
      setCharList(newChange.map(({ code }) => code));
    });

    return () => {
      unsubList();
    };
  }, []);

  // TODO: Think of a better way to do this
  // Hooks P3: Handle showing or hiding delete or add char
  const [hidingDelete, hideDelete] = useState(false);
  const [hidingAdd, hideAdd] = useState(false);

  const handleClick = (char) => {
    store.set(ACTIVE, char);
  };

  const multiSelect = (char) => {
    let newList = deleteList;
    const found = newList.indexOf(char);

    found === -1 ? newList.push(char) : newList.splice(found, 1);
    setDeleteList(newList);
  };

  return (
    <>
      <div className="overflow-y-scroll px-2 py-2 h-64">
        <div className="justify-items-center grid grid-cols-3 gap-2">
          {charList.map((char) => (
            <img
              key={`${char}`}
              src={`http://msavatar1.nexon.net/Character/${char}.png`}
              className={`rounded-full border border-red-500 ${
                activeChar === char && 'bg-blue-500'
              }`}
              onClick={() => {
                hidingAdd ? multiSelect(char) : handleClick(char);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex">
        {!hidingDelete && (
          <DeleteChars hidingAdd={hidingAdd} hideAdd={hideAdd} />
        )}
        {!hidingAdd && <AddChars hideDelete={hideDelete} />}
      </div>
    </>
  );
};
