// Core
import React, { createContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CHARACTERS } from '../utils/variables';
import { getNextReset } from '../utils/resetHelpers';

const store = new Store({ watch: true });

export const CharContext = createContext({});

export const CharProvider = ({ children }) => {
  // Add and remove characters
  const [hideAddButton, setHideAdd] = useState(false);
  const [hideDeleteButton, setHideDelete] = useState(false);

  // Characters list
  const [characters, setCharacters] = useState(
    store.get(CHARACTERS).map(({ code }) => code),
  );

  useEffect(() => {
    const unsubCharacters = store.onDidChange(CHARACTERS, (characters, _) => {
      setCharacters(characters.map(({ code }) => code));
    });
    return () => {
      unsubCharacters();
    };
  }, [characters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerReset();
    }, getNextReset() + 1);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <CharContext.Provider
      value={{
        hideAddButton,
        setHideAdd,
        hideDeleteButton,
        setHideDelete,
        characters,
        setCharacters,
      }}
    >
      {children}
    </CharContext.Provider>
  );
};

/**
 * Exporting this from resetHelper.js would not trigger an update from the subscription
 * Most likely a similar issue to the earlier CharacterList.js error
 */
const triggerReset = () => {
  const preResetChars = store.get(CHARACTERS);
  const resetChars = [];

  const dayOfWeek = new Date().getUTCDay();

  for (let char of preResetChars) {
    // Reset daily bosses
    char.bosses.daily = char.bosses.daily.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset arcane river dailies
    char.quests.arcane = char.quests.arcane.map((value) =>
      value === 1 ? 0 : value,
    );

    // Reset ALL maple world quests
    if (dayOfWeek === 1) {
      char.quests.maple = char.quests.maple.map((value) =>
        value === 1 ? 0 : value,
      );
    } else {
      // Reset daily maple world quests
      char.quests.maple = char.quests.maple.map((value, index) =>
        value === 1 && index < 9 ? 0 : value,
      );
    }

    // Reset weekly bosses
    if (dayOfWeek === 4) {
      char.bosses.weekly = char.bosses.weekly.map((value) =>
        value === 1 ? 0 : value,
      );
    }

    resetChars.push(char);
  }

  store.set(CHARACTERS, resetChars);
};
