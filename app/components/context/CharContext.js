// Core
import React, { createContext, useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers
import { CHARACTERS } from '../../constants/variables.js';
import { getNextReset, triggerReset } from '../../utils/resetHelpers.js';

const store = new Store({ watch: true });

export const CharContext = createContext({});

export const CharProvider = ({ children }) => {
  // Add and remove characters
  const [hideAddButton, setHideAdd] = useState(false);
  const [hideDeleteButton, setHideDelete] = useState(false);

  // Characters list
  const [characters, setCharacters] = useState(
    store.get(CHARACTERS).map(({ code }) => code)
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
      const chars = store.get(CHARACTERS);
      store.set(CHARACTERS, triggerReset(chars));
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
