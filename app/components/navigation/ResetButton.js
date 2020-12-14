// Core
import React from 'react';
import Store from 'electron-store';

// Helpers
import { triggerReset } from '../../utils/Reset.js';
import { GrCycle } from 'react-icons/gr';

// SCSS
import { editButtonStyle } from './styles/EditButton.scss';
import { CHARACTERS } from '../../constants/variables';

export const ResetButton = () => {
  const handleClick = () => {
    const store = new Store();
    const chars = store.get(CHARACTERS);
    store.set(CHARACTERS, triggerReset(chars));
  };

  return (
    <button className={editButtonStyle} onClick={handleClick}>
      <GrCycle />
    </button>
  );
};
