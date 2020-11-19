// Core
import React from 'react';

// Components
import { CharacterList } from './CharacterList';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';
import { RefreshChars } from './RefreshChars';

export const CharacterView = () => (
  <div className="divide-y divide-black">
    <CharacterList />
    <AddRemoveRefresh />
  </div>
);

const AddRemoveRefresh = () => (
  <div className="flex divide-x divide-black">
    <DeleteChars />
    <RefreshChars />
    <AddChars />
  </div>
);
