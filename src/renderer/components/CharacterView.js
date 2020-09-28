// Core
import React from 'react';

// Helpers/Declarations/Variables/Etc
import { DUMMY_CHARS } from './utils/variables';

// Components
export const CharacterView = () => (
  <div className="overflow-y-scroll justify-items-center grid grid-cols-3 items-stretch">
    {DUMMY_CHARS.map((char) => (
      <img
        key={char}
        src={`http://msavatar1.nexon.net/Character/${char}.png`}
        className="object-scale-down inline-block py-2 border border-red-500"
      />
    ))}
  </div>
);
