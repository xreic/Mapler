// Core
import React, { useContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CharContext } from '../context/CharContext';
import { ACTIVE, DELETING } from '../../constants/variables';

// Electron Store
const store = new Store({ watch: true });

export const CharacterList = () => {
  /**
   * Hooks P1: Initial state
   * View switching and data hooks
   */
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
    <div className={''}>
      <div className={''}>
        {characters.map((code, index) => {
          code && (
            <img
              key={code}
              src={`http://msavatar1.nexon.net/Character/${code}.png`}
              className={''}
              onClick={() => {
                hideAddButton ? multiSelect(index) : handleClick(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
