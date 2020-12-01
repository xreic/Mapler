// Core
import React from 'react';

// Contexts
import { CharProvider } from '../../context/CharContext.js';

// Components
import { CharacterList } from '../CharacterList/CharacterList.js';
import { AddChars } from '../AddChars/AddChars.js';
import { DeleteChars } from '../DeleteChars/DeleteChars.js';

// SCSS
import { charFuncContainer } from './CharacterView.scss';

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
