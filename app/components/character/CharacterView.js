// Core
import React from 'react';

// Contexts
import { CharProvider } from '../context/CharContext.js';

// Components
import { CharacterList } from './CharacterList.js';
import { AddChars } from './AddChars.js';
import { DeleteChars } from './DeleteChars.js';

// SCSS
import { charFuncContainer } from './styles/CharacterView.scss';

export const CharacterView = () => {
  return (
    <CharProvider>
      <CharacterList />

      <div className={charFuncContainer}>
        <DeleteChars />
        <AddChars />
      </div>
    </CharProvider>
  );
};
