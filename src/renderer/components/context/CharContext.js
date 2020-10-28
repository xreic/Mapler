// Core
import React, { createContext, useState } from 'react';

export const CharContext = createContext({});

export const CharProvider = ({ children }) => {
  const [hideAddButton, setHideAdd] = useState(false);
  const [hideDeleteButton, setHideDelete] = useState(false);

  return (
    <CharContext.Provider
      value={{ hideAddButton, setHideAdd, hideDeleteButton, setHideDelete }}
    >
      {children}
    </CharContext.Provider>
  );
};
