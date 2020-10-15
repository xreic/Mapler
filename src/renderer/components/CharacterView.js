// Core
import React from 'react';

// Helpers/Declarations/Variables/Etc
import { DUMMY_CHARS } from './utils/variables';
import { Transition } from './utils/Transition';

/**
 * NOTE
 * Will be using Electron store to retrieve
 * character names and character codes to render
 */
export const CharacterView = ({ location }) => (
  <>
    <Transition location={location}>
      <div className="overflow-y-scroll justify-items-center grid grid-cols-3 gap-2 px-2 py-2 h-64">
        {DUMMY_CHARS.map((char, index) => (
          <img
            key={`${char}${index}`}
            src={`http://msavatar1.nexon.net/Character/${char}.png`}
            className="object-scale-down inline-block border border-red-500"
          />
        ))}
      </div>
    </Transition>
    <p className="text-center border border-red-500">Add Character</p>
  </>
);
