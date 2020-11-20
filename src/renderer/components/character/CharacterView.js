// Core
import React from 'react';

// Contexts
import { CharProvider } from '../context/CharContext';
// import { SettingsProvider } from '../context/SettingsContext';

// Components
import { CharacterList } from './CharacterList';
// import { Settings } from './Settings';
import { AddChars } from './AddChars';
import { DeleteChars } from './DeleteChars';
// import { RefreshChars } from './RefreshChars';

export const CharacterView = () => (
  <>
    <CharProvider>
      <div className="divide-y divide-black">
        {/* <SettingsProvider>
          <Settings /> */}
        <CharacterList />
        {/* </SettingsProvider> */}

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
