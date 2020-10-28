// Core
import React from 'react';

// Components
import { CharProvider } from '../context/CharContext';
import { CharacterList } from './CharacterList';
import { DeleteChars } from './DeleteChars';
import { AddChars } from './AddChars';

export const CharacterView = () => (
  <CharProvider>
    <CharacterList />
    <div className="flex">
      <DeleteChars />
      <AddChars />
    </div>
  </CharProvider>
);
