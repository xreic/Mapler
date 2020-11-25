// Core
import React from 'react';
import { createUseStyles } from 'react-jss';

// Contexts
import { CharProvider } from '../context/CharContext';

// Components
import { CharacterList } from './CharacterList';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';

const useStyles = createUseStyles({
  viewContainer: {
    // Horizontal Elements Divide
    TwDivideYReverse: 0,
    borderTopWidth: 'calc(1px * calc(1 - var(--tw-divide-y-reverse)))',
    borderBottomWidth: 'calc(1px * var(--tw-divide-y-reverse))',
    // Horizontal Elements Divide Color
    TwDivideOpacity: 1,
    borderColor: 'rgba(0, 0, 0, var(--tw-divide-opacity))',
  },
  buttonContainer: {
    display: 'flex',
    // Vertical Elements Divide
    TwDivideXReverse: 0,
    borderRightWidth: 'calc(1px * var(--tw-divide-x-reverse))',
    borderLeftWidth: 'calc(1px * calc(1 - var(--tw-divide-x-reverse)))',
    // Vertical Elements Divide Color
    TwDivideOpacity: 1,
    borderColor: 'rgba(0, 0, 0, var(--tw-divide-opacity))',
  },
});

export const CharacterView = () => {
  const { viewContainer, buttonContainer } = useStyles();

  return (
    <>
      <CharProvider>
        <div className={viewContainer}>
          <CharacterList />

          <div className={buttonContainer}>
            <DeleteChars />
            <AddChars />
          </div>
        </div>
      </CharProvider>
    </>
  );
};
