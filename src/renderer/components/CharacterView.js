// Core
import React, { useEffect, useState } from 'react';
import Store from 'electron-store';

// Helpers/Declarations/Variables/Etc
import { ACTIVE, CHAR_CODES } from './utils/variables';
import { Transition } from './utils/Transition';
import { AddChar } from './AddChar';

// Electron Store
const store = new Store({ watch: true });

export const CharacterView = ({ location }) => {
  // const [activeChar, setActiveChar] = useState(store.get(ACTIVE));
  const [charList, setCharList] = useState(store.get(CHAR_CODES));

  useEffect(() => {
    const unsub = store.onDidChange(CHAR_CODES, (newChange, _) => {
      setCharList(newChange);
    });

    return () => {
      unsub();
    };
  }, []);

  if (charList.length > 0) {
    return (
      <>
        <Transition location={location}>
          <div className="overflow-y-scroll justify-items-center grid grid-cols-3 gap-2 px-2 py-2">
            {charList.map((char) => (
              <img
                key={`${char}`}
                src={`http://msavatar1.nexon.net/Character/${char}.png`}
                className="object-scale-down inline-block border border-red-500"
              />
            ))}
          </div>
        </Transition>
        <AddChar />
      </>
    );
  }

  return <AddChar />;
};
