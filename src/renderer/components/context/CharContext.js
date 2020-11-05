// Core
import React, { createContext, useEffect, useState } from 'react';
import Store from 'electron-store';
import { CHARACTERS } from '../utils/variables';

const store = new Store({ watch: true });

export const CharContext = createContext({});

export const CharProvider = ({ children }) => {
  const [hideAddButton, setHideAdd] = useState(false);
  const [hideDeleteButton, setHideDelete] = useState(false);
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
