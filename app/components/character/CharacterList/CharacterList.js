// Core
import React, { useContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CharContext } from '../../context/CharContext.js';
import { ACTIVE, DELETING } from '../../../constants/variables.js';

// SCSS
import {
  characterListStyle,
  inactiveCharStyle,
  activeCharStyle,
  deleteCharStyle,
} from './CharacterList.scss';

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
    const newDeleting = store.get(DELETING);
    newDeleting[index] = newDeleting[index] === 0 ? 1 : 0;
    store.set(DELETING, newDeleting);
  };

  return (
    <div className={characterListStyle}>
      <div>
        {characters.map((code, index) => {
          if (code) {
            // TODO: Converted into a function and used for "className" of img element (?)
            const charStyle = hideAddButton
              ? deleting[index]
                ? deleteCharStyle
                : inactiveCharStyle
              : active === index
              ? activeCharStyle
              : inactiveCharStyle;

            return (
              <img
                className={charStyle}
                key={code}
                src={`http://msavatar1.nexon.net/Character/${code}.png`}
                onClick={() => {
                  hideAddButton ? multiSelect(index) : handleClick(index);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
