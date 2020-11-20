// Core
import React, { useContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
// import { SettingsContext } from '../context/SettingsContext';
import { CharContext } from '../context/CharContext';
import { ACTIVE, DELETING } from '../utils/variables';

// Electron Store
const store = new Store({ watch: true });

export const CharacterList = () => {
  /**
   * Hooks P1: Initial state
   * View switching and data hooks
   */
  // const { isSettingsOpen } = useContext(SettingsContext);
  const { hideAddButton, characters } = useContext(CharContext);
  const [active, setActive] = useState(store.get(ACTIVE));
  const [deleting, setDeleting] = useState(store.get(DELETING));

  /**
   * Hooks P2: Store subscriptions
   * All encompassing subscription
   */
  useEffect(() => {
    const unsub = store.onDidAnyChange(({ active, deleting }, _) => {
      setActive(active);
      setDeleting(deleting);
    });

    return () => {
      unsub();
    };
  }, [active, deleting]);

  const handleClick = (index) => {
    store.set(ACTIVE, index);
  };

  const multiSelect = (index) => {
    const deleting = store.get(DELETING);
    deleting[index] = deleting[index] === 0 ? 1 : 0;
    store.set(DELETING, deleting);
  };

  return (
    <div className="overflow-y-scroll px-2 py-2 h-287px bg-gray-500">
      <div className="justify-items-center grid grid-cols-3 gap-2">
        {characters.map(
          (code, index) =>
            code && (
              <img
                key={code}
                src={`http://msavatar1.nexon.net/Character/${code}.png`}
                className={`rounded-full shadow-2xl ${
                  hideAddButton
                    ? deleting[index] && 'bg-green-500'
                    : active === index && 'bg-blue-500'
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
