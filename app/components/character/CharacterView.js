// Core
import React from 'react';

// Contexts
import { CharProvider } from '../context/CharContext';

// Components
import { CharacterList } from './CharacterList';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';

export const CharacterView = () => {
  const { viewContainer, buttonContainer } = useStyles();

  return (
    <>
      <CharProvider>
        <div className={''}>
          <CharacterList />

          <div className={''}>
            <DeleteChars />
            <AddChars />
          </div>
        </div>
      </CharProvider>
    </>
  );
};
