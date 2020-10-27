// Core
import React, { useState } from 'react';

// Components and Helpers
import { DeleteChars } from './DeleteChars';
import { AddChars } from './AddChars';
import { CharacterList } from './CharacterList';

// Electron Store
// const store = new Store({ watch: true });

export const CharacterView = () => {
  // TODO: Think of a better way to do this
  // Handle showing or hiding delete or add char
  const [hidingDelete, hideDelete] = useState(false);
  const [hidingAdd, hideAdd] = useState(false);

  return (
    <>
      <CharacterList hidingAdd={hidingAdd} />
      <div className="flex">
        {!hidingDelete && (
          <DeleteChars hidingAdd={hidingAdd} hideAdd={hideAdd} />
        )}
        {!hidingAdd && <AddChars hideDelete={hideDelete} />}
      </div>
    </>
  );
};
