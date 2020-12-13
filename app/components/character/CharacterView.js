// Core
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
      <DndProvider backend={HTML5Backend}>
        <CharacterList />
      </DndProvider>

      <div className={charFuncContainer}>
        <DeleteChars />
        <AddChars />
      </div>
    </CharProvider>
  );
};
