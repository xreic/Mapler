// Core
import React, { useContext } from 'react';

// Components
import { CharProvider, CharContext } from '../context/CharContext';
import { CharacterList } from './CharacterList';
import { EditChars } from './EditChars';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';

export const CharacterView = () => (
  <CharProvider>
    <div className="divide-y divide-black">
      <EditChars />
      <CharacterList />
      <AddRemove />
    </div>
  </CharProvider>
);

const AddRemove = () => {
  const { isEditing } = useContext(CharContext);

  if (isEditing) {
    return (
      <div className="flex divide-x divide-black">
        <DeleteChars />
        <AddChars />
      </div>
    );
  }

  return null;
};
