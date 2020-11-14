// Core
import React from 'react';

// Components
import { CharProvider } from '../context/CharContext';
import { CharacterList } from './CharacterList';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';
import { RefreshChars } from './RefreshChars';

export const CharacterView = () => (
  <CharProvider>
    <div className="divide-y divide-black">
      <CharacterList />
      <AddRemoveRefresh />
    </div>
  </CharProvider>
);

const AddRemoveRefresh = () => (
  <div className="flex divide-x divide-black">
    <DeleteChars />
    <RefreshChars />
    <AddChars />
  </div>
);
