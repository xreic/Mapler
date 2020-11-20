// Core
import React from 'react';

// Contexts
import { CharProvider } from '../context/CharContext';

// Components
import { CharacterList } from './CharacterList';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';

// Hidden Items
// import { SettingsProvider } from '../context/SettingsContext';
// import { Settings } from './Settings';
// import { RefreshChars } from './RefreshChars';

export const CharacterView = () => (
  <>
    <CharProvider>
      <div className="divide-y divide-black">
        {/*
          Hidden for now until functionality is needed
          <SettingsProvider>
            <Settings />
          </SettingsProvider>
        */}

        <CharacterList />
        <AddRemoveRefresh />
      </div>
    </CharProvider>
  </>
);

// Mini-components
const AddRemoveRefresh = () => (
  <div className="flex divide-x divide-black">
    <DeleteChars />
    {/*
      Hiding for now feels like an unnecessary function
      <RefreshChars />
    */}
    <AddChars />
  </div>
);
